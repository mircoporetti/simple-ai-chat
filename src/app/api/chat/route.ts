import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { question } = await req.json();

        const API_BASE_URL = process.env.apiBaseUrl;

        const response = await fetch(`${API_BASE_URL}/chat/completion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: question }),
        });

        console.log(response)
        if (!response.ok) {
            return NextResponse.json({ error: 'Backend error' }, { status: response.status });
        }

        const bodyStream = response.body;

        if (!bodyStream) {
            return NextResponse.json({ error: 'No response body from backend' }, { status: 500 });
        }

        const stream = new ReadableStream({
            start(controller) {
                const reader = bodyStream.getReader();

                function push() {
                    reader.read().then(({ done, value }) => {
                        if (done) {
                            controller.close();
                            return;
                        }
                        controller.enqueue(value);
                        push();
                    }).catch(err => {
                        console.error('Stream error:', err);
                        controller.error(err);
                    });
                }
                push();
            }
        });

        return new NextResponse(stream, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain',
            }
        });

    } catch (e) {
        const error = e as Error;
        return NextResponse.json({ error: `Error while fetching AI Backend: ${error.message}` }, { status: 500 });
    }
}
