export async function GET() {
    return Response.json({ message: 'Hello World!' });
}

export async function POST(request) {
    const data = await request.json();
    return Response.json({ message: 'Data received', data });
}

export async function PUT(request) {
    const data = await request.json();
    return Response.json({ message: 'Data updated', data });
}

export async function DELETE() {
    return Response.json({ message: 'Data deleted' });
}

