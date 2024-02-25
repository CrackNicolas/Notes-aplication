import { NextResponse } from 'next/server';

import Notes from '@/backend/schemas/notes'

import { Conect_database } from "@/backend/utils/db";

import { Props_response } from '@/context/types/response';
import { Props_note } from '@/frontend/types/props';

export async function GET(req: Request, { params: { segments } }: { params: { segments: string[] } }) {
    const connection = await Conect_database();
    if (connection === 2) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        const search: Props_note[] = await Notes.find(
            {
                $or: [
                    { title: { $regex: `(?i)^${segments[0]}` } },
                    { description: { $regex: `(?i)^${segments[0]}` } }
                ]
            }
        );
        return NextResponse.json<Props_response>({ status: 200, data: search });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}
export async function DELETE(req: Request, { params: { segments } }: { params: { segments: string[] } }) {
    const _id = segments[0];

    const connection = await Conect_database();
    if (connection === 2) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        await Notes.findByIdAndDelete(_id);
        return NextResponse.json<Props_response>({ status: 204, info: { message: `Nota eliminada` } })
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}