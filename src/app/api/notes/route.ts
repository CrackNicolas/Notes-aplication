import { NextResponse } from "next/server"

export async function GET() {
    try {
        return NextResponse.json({
            notes : [
                {
                    id: '1',
                    title: 'Primera nota',
                    description: 'a',
                    creation_date: '2000-20-12'
                },
                {
                    id: '2',
                    title: 'Segunda nota',
                    description: 'b',
                    creation_date: '2000-20-02'
                },
                {
                    id: '3',
                    title: 'Tercera nota',
                    description: 'b',
                    creation_date: '2000-20-02'
                }
            ]
        })
    } catch (error) {
        return NextResponse.json({ error: "Error" })
    }
}

export async function POST(req: Request) {
    const data = await req.json();

    try {
        return NextResponse.json({
            message: "Registrado"
        })
    } catch (error) {
        return NextResponse.json({
            message: "Fallo en el registro"
        });
    }
}