import { NextResponse } from "next/server"

import { Conect_db } from "@/backend/utils/db";

import Notes from '@/backend/schemas/notes'

export async function GET() {
    Conect_db();
    try {
        const notes = await Notes.find();
        console.log(notes);
        return NextResponse.json({notes});
    } catch (error) {
        return NextResponse.json({ error: "Error" })
    }
}

export async function POST(req: Request) {
    const {title, description} = await req.json();

    Conect_db();

    try {
        const new_note = new Notes({title,description});
        new_note.save();
        return NextResponse.json({
            message: "Registrado",
            note:new_note
        })
    } catch (error) {
        return NextResponse.json({
            message: "Fallo en el registro"
        });
    }
}