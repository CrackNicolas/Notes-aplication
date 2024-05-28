import { type NextRequest } from 'next/server';
import { NextResponse } from "next/server";

import { Props_user } from '@/context/types/session';
import { Props_response } from "@/context/types/response";

import { Conect_database } from "@/backend/utils/db";

import User from '@/backend/schemas/user'

export async function GET(): Promise<NextResponse> {

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } })

    try {
        const users: Props_user[] = await User.find();

        return NextResponse.json<Props_response>({ status: 200, data: users });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    const token = req.cookies.get('__session')?.value as string;

    if (!token) return NextResponse.json<Props_response>({ status: 401, info: { message: "Credenciales invalidas" } });

    const { id, name, email, active } = await req.json();

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } })

    try {
        const exists_user = await User.findOne({ email });

        if (exists_user) {
            exists_user.active = true;
            await exists_user.save();
            return NextResponse.json<Props_response>({ status: 400, info: { message: "El usuario ya está registrado" } });
        }

        const new_user = new User({ id, name, email, active });

        await new_user.save();

        return NextResponse.json<Props_response>({ status: 201, info: { message: 'Usuario registrado' } });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
    const { email, active } = await req.json();

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } })

    try {
        const exists_user = await User.findOne({ email });

        if (!exists_user) {
            return NextResponse.json<Props_response>({ status: 400, info: { message: "El usuario no existe" } });
        }

        exists_user.active = active;

        await exists_user.save();

        return NextResponse.json<Props_response>({ status: 201, info: { message: 'Usuario desconectado' } });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}