import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { title?: string; body?: string; audience?: string };

  if (!body.title || !body.body || !body.audience) {
    return NextResponse.json({ ok: false, error: "title, body, and audience are required" }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    queued: {
      id: `push_${Date.now()}`,
      title: body.title,
      body: body.body,
      audience: body.audience,
      channels: ["firebase_messaging", "in_app"],
      queuedAt: new Date().toISOString()
    }
  });
}
