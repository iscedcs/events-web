"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "../../../../../actions/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

  const requestPayload = await req.json();
  const { eventId, participantA } = requestPayload;

  const url = `${EVENTS_API}${URLS.chat.create_private_room_host}`;
  const payload = {
    eventId,
    participantA,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log({ data });

    if (res.ok) {
      return NextResponse.json(data);
    }
    return NextResponse.json(
      { error: "Failed to create room with host" },
      { status: 400 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: "Invalid request payload", details: e },
      { status: 400 }
    );
  }
}
