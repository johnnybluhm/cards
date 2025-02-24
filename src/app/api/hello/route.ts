import { NextRequest } from "next/server";

export async function GET() {
    return Response.json({ message: 'Hello World!' });
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    return Response.json({ message: 'Data received', data });
}

