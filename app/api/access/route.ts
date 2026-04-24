import { NextResponse } from "next/server";

const PASSWORD = "your-secret-password"; // move to env later

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password !== PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set("site-access", "true", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
  });

  return res;
}