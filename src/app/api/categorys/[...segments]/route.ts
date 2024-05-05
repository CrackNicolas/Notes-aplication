import { NextResponse } from 'next/server';

import Category from '@/backend/schemas/category';

import { Props_category } from '@/context/types/category';
import { Props_response } from '@/context/types/response';

import { Conect_database } from '@/backend/utils/db';

export async function GET(req: Request, { params: { segments } }: { params: { segments: string[] } }): Promise<NextResponse> {
    const user_id = segments[0];
    const use = segments[1];

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } })

    try {
        const count: number = await Category.countDocuments();
        if (count === 0) {
            await Category.create([
                { title: 'Proyecto', use: true, icon: 'proyects', user_id },
                { title: 'Trabajo', use: true, icon: 'briefcase', user_id },
                { title: 'Inversion', use: false, icon: 'investment', user_id },
                { title: 'Estudios', use: false, icon: 'studies', user_id },
                { title: 'Personal', use: false, icon: 'person', user_id },
                { title: 'Viajes', use: false, icon: 'plane', user_id },
                { title: 'Historias', use: false, icon: 'stories', user_id },
                { title: 'Peliculas', use: false, icon: 'film', user_id },
                { title: 'Musicas', use: false, icon: 'music', user_id },
                { title: 'Otros', use: false, icon: 'others', user_id }
            ])
        }

        const categorys: Props_category[] = await Category.find((use)? { user_id, use } : { user_id });

        return NextResponse.json<Props_response>({ status: 200, data: categorys });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}