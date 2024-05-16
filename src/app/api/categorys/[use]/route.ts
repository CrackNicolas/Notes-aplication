import { getAuth } from '@clerk/nextjs/server';

import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';

import Category from '@/backend/schemas/category';

import { Props_response } from '@/context/types/response';

import { Conect_database } from '@/backend/utils/db';

export async function GET(req: NextApiRequest, { params: { use } }: { params: { use: boolean } }): Promise<NextResponse> {
    const { userId } = getAuth(req);

    if (!userId) return NextResponse.json<Props_response>({ status: 401, info: { message: "Credenciales invalidas" } });

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } })

    try {
        const user_categorys = await Category.find({ "use.user_id": userId });

        const categorys = user_categorys.filter(category =>
            category.use.some((prev: { user_id: string, value: boolean }) => prev.user_id === userId && prev.value === use)
        );

        return NextResponse.json<Props_response>({ status: 200, data: categorys });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}