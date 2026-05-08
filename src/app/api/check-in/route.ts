import { NextRequest, NextResponse } from "next/server";

const DEMO_PIN = "4826";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { memberId?: string; pin?: string; existingToday?: boolean };

  if (!body.memberId) {
    return NextResponse.json({ ok: false, error: "memberId is required" }, { status: 400 });
  }

  if (body.existingToday) {
    return NextResponse.json({ ok: false, error: "duplicate_check_in_prevented" }, { status: 409 });
  }

  if (body.pin !== DEMO_PIN) {
    return NextResponse.json({ ok: false, error: "invalid_pin" }, { status: 403 });
  }

  const now = new Date();
  return NextResponse.json({
    ok: true,
    checkIn: {
      id: `chk_${now.getTime()}`,
      memberId: body.memberId,
      timestamp: now.toISOString(),
      late: now.getHours() >= 10,
      source: "pin"
    },
    pointsAwarded: 10
  });
}
