import { NextResponse } from 'next/server';

import Category from '@/backend/schemas/category';

import { Props_category } from '@/context/types/category';
import { Props_response } from '@/context/types/response';

import { Conect_database } from '@/backend/utils/db';

export async function GET(req: Request, { params: { use } }: { params: { use: boolean } }): Promise<NextResponse> {
    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } })

    try {
        const categorys: Props_category[] = await Category.find({ use });
        return NextResponse.json<Props_response>({ status: 200, data: categorys });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}