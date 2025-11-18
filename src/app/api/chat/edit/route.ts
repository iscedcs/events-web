"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "../../../../../actions/auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

  const requestPayload = await req.json();
  const { id, message } = requestPayload;

  const url = `${EVENTS_API}${URLS.chat.update_message.replace("{id}", id)}`;
  const payload = {
    message,
  };

  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log({ data: data.data.data });
    if (res.ok) {
      return NextResponse.json(data);
    }
    return NextResponse.json(
      { error: "Failed to edit message" },
      { status: 400 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: "Invalid request payload", details: e },
      { status: 400 }
    );
  }
}
