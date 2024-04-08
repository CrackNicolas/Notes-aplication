import { NextResponse } from "next/server"

import { Props_category } from "@/context/types/category";
import { Props_response } from "@/context/types/response";

import { Conect_database } from "@/backend/utils/db";

import Category from '@/backend/schemas/category'

export async function GET(): Promise<NextResponse> {
    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } })

    try {
        const category: Props_category[] = await Category.find();
        return NextResponse.json<Props_response>({ status: 200, data: category });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}
/*
export async function PUT(req: Request): Promise<NextResponse> {
    const { title, paint } = await req.json();

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        const exists_category = await Category.findById(
            { title: { $regex: `(?i)^${title}` } }
        );
        if (!exists_category) {
            return NextResponse.json<Props_response>({ status: 404, info: { message: "Categoria no encontrada" } });
        }

        exists_category.paint = paint;

        await exists_category.save();

        return NextResponse.json<Props_response>({ status: 200, info: { message: `La categoria "${title}" se usara` } });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}*/