import { NextResponse } from "next/server"

import { Props_response } from "@/context/types/response";

import { Conect_database } from "@/backend/utils/db";

import User from '@/backend/schemas/user'

export async function POST(req: Request): Promise<NextResponse> {
    const data = await req.formData();

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } })

    try {
        const exists_user = await User.findOne({ email: data.get('email') });

        if (exists_user) {
            return NextResponse.json<Props_response>({ status: 400, info: { message: "El usuario ya está registrado" } });
        }

        const new_user = new User({
            id: data.get('id'),
            name: data.get('name'),
            email: data.get('email')
        });

        await new_user.save();

        return NextResponse.json<Props_response>({ status: 201, info: { message: 'Usuario registrado' } });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}