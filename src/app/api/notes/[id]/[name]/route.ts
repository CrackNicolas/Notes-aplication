//import axios from 'axios';

import { NextResponse } from "next/server";

export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
    try {
        // const {data} = await axios.get("");
        return NextResponse.json({});
    } catch (error) {
        return NextResponse.json({});
    }
}

export async function POST(req: Request) {
    const data = req.json();

    try {
        //await axios.post("");
        return NextResponse.json({});
    } catch (error) {
        return NextResponse.json({});
    }
}

export async function PUTS(req: Request, { params: { id } }: { params: { id: string } }) {
    const data = req.json();

    try {
        //const search = await axios.get(id);
        //const result = await axios.put("");
        return NextResponse.json({ id });
    } catch (error) {
        return NextResponse.json({});
    }
}

export async function DELETE(req: Request, { params: { id } }: { params: { id: string } }) {
    try {
        //await axios.delete(id);
        return NextResponse.json({});
    } catch (error) {
        return NextResponse.json({});
    }
}


