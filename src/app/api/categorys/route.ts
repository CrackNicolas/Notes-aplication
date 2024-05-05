import { NextResponse } from "next/server"

import { Props_response } from "@/context/types/response";

import { Conect_database } from "@/backend/utils/db";

import Category from '@/backend/schemas/category'

export async function PUT(req: Request): Promise<NextResponse> {
    const { title, use } = await req.json();

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        if (!use) {
            const categorys_with_true = await Category.countDocuments({ use: true });
            if (categorys_with_true === 2) {
                return NextResponse.json<Props_response>({ status: 200, info: { message: 'Debes tener por lo menos 2 categorias en uso' } });
            }
        }

        const exists_category = await Category.findOne({ title });

        if (!exists_category) {
            return NextResponse.json<Props_response>({ status: 404, info: { message: "Categoria no encontrada" } });
        }

        exists_category.use = use;

        await exists_category.save();

        return NextResponse.json<Props_response>({ status: 200, info: { message: `Categoria "${title}" ${use ? 'configurada para su uso' : 'fuera de uso'} ` } });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}