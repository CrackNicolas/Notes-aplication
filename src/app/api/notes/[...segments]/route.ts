import { NextResponse } from 'next/server';

import Notes from '@/backend/schemas/notes'

import { Conect_database } from "@/backend/utils/db";

import { Props_response } from '@/backend/types/response';

export async function GET(req: Request, { params: { segments } }: { params: { segments: string[] } }) {
    const connection = await Conect_database();
    if (connection === 2) return NextResponse.json<Props_response>({ status: 500, info: { error: "Error connecting to the database" } });

    try {
        const search = await Notes.find(
            {
                $or: [
                    { title: { $regex: `^${segments[0]}` } },
                    { description: segments[0] }
                ]
            }
        );
        return NextResponse.json<Props_response>({ status: 200, info: search });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { error: "Server error" } })
    }
}
export async function DELETE(req: Request, { params: { segments } }: { params: { segments: string[] } }) {
    const _id = segments[0];

    const connection = await Conect_database();
    if (connection === 2) return NextResponse.json<Props_response>({ status: 500, info: { error: "Error connecting to the database" } });

    try {
        await Notes.findByIdAndDelete(_id);
        return NextResponse.json<Props_response>({ status: 204, info: { error: `Note ${_id} removed` } })
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { error: "Server error" } })
    }
}