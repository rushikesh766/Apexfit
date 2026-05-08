import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    pin: "4826",
    rotatesAt: "2026-05-04T00:00:00+05:30",
    rules: ["One check-in per member per day", "Duplicate PIN attempts are rejected", "Late arrivals are timestamped"]
  });
}

export async function POST() {
  const pin = String(Math.floor(1000 + Math.random() * 9000));
  return NextResponse.json({
    pin,
    status: "rotated",
    pushedTo: ["Owner", "Trainer"],
    rotatedAt: new Date().toISOString()
  });
}
