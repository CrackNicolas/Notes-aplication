import jwt from 'jsonwebtoken';

import { type NextRequest } from 'next/server';
import { NextResponse } from "next/server";

import { Props_response } from "@/context/types/response";

import { Conect_database } from "@/backend/utils/db";

import Notes from '@/backend/schemas/note';
import { Props_note } from '@/context/types/note';

export async function GET(req: NextRequest, { params: { user } }: { params: { user: string } }): Promise<NextResponse> {
    const token = req.cookies.get('__session')?.value as string;

    if (!token) return NextResponse.json<Props_response>({ status: 401, info: { message: "Credenciales invalidas" } });

    const user_id = jwt.decode(token)?.sub;

    if (user_id !== process.env.ROL_ADMIN_USER_ID) return NextResponse.json<Props_response>({ status: 403, info: { message: "Acceso no autorizado" } });

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } })

    try {
        const notes: Props_note[] = await Notes.find({ user_id: user });

        return NextResponse.json<Props_response>({ status: 200, data: notes });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}