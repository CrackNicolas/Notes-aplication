import { NextResponse } from 'next/server';

import Notes from '@/backend/schemas/notes'

export async function DELETE(req: Request, { params: { _id } }: { params: { _id: string } }) {
    try {
        await Notes.findByIdAndDelete(_id);
        return NextResponse.json({ message: "Eliminado" })
    } catch (error) {
        return NextResponse.json({ error: "Error" })
    }
}