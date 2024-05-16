import { getAuth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server"
import { NextApiRequest } from "next";

import { Props_response } from "@/context/types/response";
import { Props_category } from "@/context/types/category";

import { Conect_database } from "@/backend/utils/db";

import Category from '@/backend/schemas/category'

export async function GET(req: NextApiRequest): Promise<NextResponse> {
    const { userId } = getAuth(req);

    if (!userId) return NextResponse.json<Props_response>({ status: 401, info: { message: "Credenciales invalidas" } });

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        const count: number = await Category.countDocuments();
        if (count === 0) {
            await Category.create([
                { title: 'Proyecto', use: [{ value: true, userId }], icon: 'proyects' },
                { title: 'Trabajo', use: [{ value: true, userId }], icon: 'briefcase' },
                { title: 'Inversion', use: [{ value: false, userId }], icon: 'investment' },
                { title: 'Estudios', use: [{ value: false, userId }], icon: 'studies' },
                { title: 'Personal', use: [{ value: false, userId }], icon: 'person' },
                { title: 'Viajes', use: [{ value: false, userId }], icon: 'plane' },
                { title: 'Historias', use: [{ value: false, userId }], icon: 'stories' },
                { title: 'Peliculas', use: [{ value: false, userId }], icon: 'film' },
                { title: 'Musicas', use: [{ value: false, userId }], icon: 'music' },
                { title: 'Otros', use: [{ value: false, userId }], icon: 'others' }
            ])
        }

        const user_category = await Category.findOne({ "use.user_id": userId });

        if (!user_category) {
            await Category.updateMany({}, { $push: { use: { value: false, userId } } });
            await Category.updateMany(
                { title: { $in: ["Proyecto", "Trabajo"] } },
                { $set: { "use.$[elem].value": true } },
                { arrayFilters: [{ "elem.user_id": userId }] }
            );
        }

        const categorys: Props_category[] = await Category.find({ "use.user_id": userId });

        return NextResponse.json<Props_response>({ status: 200, data: categorys });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}

export async function PUT(req: Request): Promise<NextResponse> {
    const { userId } = getAuth(req as any);

    if (!userId) return NextResponse.json<Props_response>({ status: 401, info: { message: "Credenciales invalidas" } });

    const { title, use, user_id } = await req.json();

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        if (!use) {
            const user_categorys = await Category.find({ "use.user_id": user_id });

            const count: number = user_categorys.filter(category =>
                category.use.some((prev: { user_id: string, value: boolean }) => prev.user_id === user_id && prev.value === true)
            ).length

            if (count === 2) {
                return NextResponse.json<Props_response>({ status: 200, info: { message: 'Debes tener por lo menos 2 categorias en uso' } });
            }
        }

        const exists_category = await Category.findOne({ title });

        if (!exists_category) {
            return NextResponse.json<Props_response>({ status: 404, info: { message: "Categoria no encontrada" } });
        }

        const category = exists_category.use.find((prev: { user_id: string }) => prev.user_id === user_id);
        category.value = use;

        await exists_category.save();

        return NextResponse.json<Props_response>({ status: 200, info: { message: `Categoria "${title}" ${use ? 'configurada para su uso' : 'fuera de uso'} ` } });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}