import { NextResponse } from "next/server"

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