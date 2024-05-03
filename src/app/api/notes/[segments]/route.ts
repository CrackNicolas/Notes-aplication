import { NextResponse } from 'next/server';

import { Props_note } from '@/context/types/note';
import { Props_response } from '@/context/types/response';

import { Conect_database } from "@/backend/utils/db";
import { File_delete } from '@/backend/utils/cloudinary';

import { Query } from '@/backend/api/query';
import Notes from '@/backend/schemas/notes'

export async function GET(req: Request, { params: { segments } }: { params: { segments: string } }): Promise<NextResponse> {
    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        const search: Props_note[] = await Notes.find(Query(segments));
        
        return NextResponse.json<Props_response>({ status: 200, data: search });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}
export async function DELETE(req: Request, { params: { segments } }: { params: { segments: string } }): Promise<NextResponse> {
    const _id = segments;

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        const note: any = await Notes.findByIdAndDelete(_id);
        const response = (!note.file.id) ? true : await File_delete(note?.file.id);

        return NextResponse.json<Props_response>({ status: (response) ? 204 : 500, info: { message: (response) ? 'Nota eliminada' : 'La nota no se elimino definitivamente' } })
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}