"use server";
import { AUTH_API, URLS } from "@/lib/const";
import { NextResponse } from "next/server";

// export const POST = async (email: string) => {
//   const url = `${AUTH_API}${URLS.auth.request_verification_code}`;
//   const payload = { email };

//   try {
//     const res = await fetch(url, {
//       method: "POST",
//       body: JSON.stringify(payload),
//     });
//     const data = await res.json();
//     if (!res.ok) {
//       return null;
//     }
//     return data;
//   } catch (e: any) {
//     console.log("Error requesting verfication code", e);
//   }
// };

export async function POST(req: Request) {
  const url = `${AUTH_API}${URLS.auth.request_verification_code}`;
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
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 400 });
  }
  return NextResponse.json(data);
}
