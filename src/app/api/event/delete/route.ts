"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "../../../../../actions/auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

  const requestPayload = await req.json();
  const { id } = requestPayload;

  const url = `${EVENTS_API}${URLS.events.delete.replace("{id}", id)}`;

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to delete event" },
        { status: 400 }
      );
    }
    return NextResponse.json(data);
  } catch (e: any) {
    console.log("Delete event DELETE request error", e);
    return NextResponse.json(
      { error: "Invalid request payload", details: e },
      { status: 400 }
    );
  }
}
