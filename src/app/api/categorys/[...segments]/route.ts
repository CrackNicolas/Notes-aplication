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
                { title: 'Proyecto', use: [{ value: true, user_id }], icon: 'proyects' },
                { title: 'Trabajo', use: [{ value: true, user_id }], icon: 'briefcase' },
                { title: 'Inversion', use: [{ value: false, user_id }], icon: 'investment' },
                { title: 'Estudios', use: [{ value: false, user_id }], icon: 'studies' },
                { title: 'Personal', use: [{ value: false, user_id }], icon: 'person' },
                { title: 'Viajes', use: [{ value: false, user_id }], icon: 'plane' },
                { title: 'Historias', use: [{ value: false, user_id }], icon: 'stories' },
                { title: 'Peliculas', use: [{ value: false, user_id }], icon: 'film' },
                { title: 'Musicas', use: [{ value: false, user_id }], icon: 'music' },
                { title: 'Otros', use: [{ value: false, user_id }], icon: 'others' }
            ])
        }

        const categorys: Props_category[] = await Category.find((use) ? { "use.user_id": user_id, "use.value": use } : { "use.user_id": user_id });

        return NextResponse.json<Props_response>({ status: 200, data: categorys });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}