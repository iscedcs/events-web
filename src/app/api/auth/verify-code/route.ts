import { AUTH_API, URLS } from "@/lib/const";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = `${AUTH_API}${URLS.auth.verify_code}`;

  const { email, code } = await req.json();
  const payload = {
    email,
    code,
  };
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 400 }
    );
  }
  return NextResponse.json(data);
}
