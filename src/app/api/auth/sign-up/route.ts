"use server";
import { AUTH_API, URLS } from "@/lib/const";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = `${AUTH_API}${URLS.auth.sign_up}`;
  //   const payload = { email };
  const { email } = await req.json();
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  // console.log({ data });
  if (data.statusCode === 500) {
    return NextResponse.json(
      { error: "This email is already being used." },
      { status: 500 }
    );
  }
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 400 });
  }

  return NextResponse.json(data);
}
