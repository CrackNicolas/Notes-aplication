import jwt from 'jsonwebtoken';

import { type NextRequest } from 'next/server';
import { NextResponse } from "next/server";

import { Props_note } from "@/context/types/note";
import { Props_category } from "@/context/types/category";
import { Props_response } from "@/context/types/response";

import { Conect_database } from "@/backend/utils/db";
import { File_transformer, File_edit } from '@/backend/utils/cloudinary';

import Notes from '@/backend/schemas/note'

export async function GET(req: NextRequest): Promise<NextResponse> {
    const token = req.cookies.get('__session')?.value as string;
    const user_id = jwt.decode(token)?.sub;

    if (!token) return NextResponse.json<Props_response>({ status: 401, info: { message: "Credenciales invalidas" } });

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        const search: Props_note[] = await Notes.find({ user_id });

        return NextResponse.json<Props_response>({ status: 200, data: search });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}
export async function POST(req: NextRequest): Promise<NextResponse> {
    const token = req.cookies.get('__session')?.value as string;
    const user_id = jwt.decode(token)?.sub;

    if (!token) return NextResponse.json<Props_response>({ status: 401, info: { message: "Credenciales invalidas" } });

    const data = await req.formData();

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        const category_prev = data.get('category');
        const category: Props_category = category_prev && typeof category_prev === 'string' ? JSON.parse(category_prev) : null;

        const note_data: any = {
            title: data.get('title'),
            description: data.get('description'),
            category: {
                title: category.title,
                icon: category.icon
            },
            priority: data.get('priority'),
            featured: (data.get('featured') === 'SI'),
            user_id
        };

        const file = data.get('file') as File;

        if (file && !file.type.startsWith('image/')) {
            return NextResponse.json<Props_response>({ status: 400, info: { message: "Solo se permiten archivos de imagen" } });
        }

        if (file) {
            const { id, url } = await File_transformer(file);
            if (!url) {
                return NextResponse.json<Props_response>({ status: 404, info: { message: "Archivo no encontrado" } });
            }
            note_data.file = { id, name: file.name, url };
        }

        const new_note = new Notes(note_data);
        await new_note.save();

        return NextResponse.json<Props_response>({ status: 201, info: { message: `La nota "${data.get('title')}" fue creada con exito` } });
    } catch (error: any) {
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            return NextResponse.json<Props_response>({ status: 400, info: { message: `La nota "${error.keyValue.title}" ya existe` } })
        } else {
            return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } })
        }
    }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
    const token = req.cookies.get('__session')?.value as string;
    const user_id = jwt.decode(token)?.sub;

    if (!token) return NextResponse.json<Props_response>({ status: 401, info: { message: "Credenciales invalidas" } });

    const data = await req.formData();

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        const exists_note = await Notes.findById(data.get('_id'));
        if (!exists_note) {
            return NextResponse.json<Props_response>({ status: 404, info: { message: "Id Nota no encontrada" } });
        }

        const category_prev = data.get('category');
        const category: Props_category = category_prev && typeof category_prev === 'string' ? JSON.parse(category_prev) : null;

        exists_note.title = data.get('title');
        exists_note.description = data.get('description');
        exists_note.category = {
            title: category.title,
            icon: category.icon
        };
        exists_note.priority = data.get('priority');
        exists_note.featured = (data.get('featured') === 'SI');
        exists_note.user_id = user_id;

        const file = data.get('file') as File;

        if (file && !file.type.startsWith('image/')) {
            return NextResponse.json<Props_response>({ status: 400, info: { message: "Solo se permiten archivos de imagen" } });
        }

        if (file) {
            const { id, url } = await File_edit(exists_note.file.id, file);
            if (!url) {
                return NextResponse.json<Props_response>({ status: 404, info: { message: "Archivo no encontrado" } });
            }

            exists_note.file = { id, name: file.name, url };
        }

        await exists_note.save();

        return NextResponse.json<Props_response>({ status: 200, info: { message: `La nota "${exists_note.title}" fue modificada` } });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}