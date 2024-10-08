import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }): Promise<NextResponse> {
    try {
        return NextResponse.json({ status: 200, data: (id === process.env.ROL_ADMIN_USER_ID) ? 'admin' : 'member' })
    } catch (error) {
        return NextResponse.json({ status: 500, info: { message: "Errores con el servidor" } })
    }
}