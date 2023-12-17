import { NextResponse } from "next/server"

import { Conect_db } from "@/backend/utils/db";

import Notes from '@/backend/schemas/notes'

import { Props_response } from "@/backend/types/response";

export async function GET() {
    const connection = await Conect_db();
    if (connection === 2) return NextResponse.json<Props_response>({ status: 500 });

    try {
        const notes = await Notes.find();
        return NextResponse.json<Props_response>({ status: 200, info: notes });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { error: "Server error" } })
    }
}

export async function POST(req: Request) {
    const { title, description } = await req.json();

    const connection = await Conect_db();
    if (connection === 2) return NextResponse.json<Props_response>({ status: 500 });

    try {
        const new_note = new Notes({ title, description });
        await new_note.save();
        return NextResponse.json<Props_response>({ status: 201, info: new_note });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { error: "Server error" } })
    }
}