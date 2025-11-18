"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "../../../../../actions/auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

  const requestPayload = await req.json();
  const { id } = requestPayload;

  const url = `${EVENTS_API}${URLS.chat.harddelete_message.replace(
    "{id}",
    id
  )}`;

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      return NextResponse.json(data.success);
    }
    return NextResponse.json(
      { error: "Failed to hard delete message" },
      { status: 400 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: "Invalid request payload", details: e },
      { status: 400 }
    );
  }
}

export async function PATCH(req: Request) {
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

  const requestPayload = await req.json();
  const { id } = requestPayload;

  const url = `${EVENTS_API}${URLS.chat.softdelete_message.replace(
    "{id}",
    id
  )}`;

  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      return NextResponse.json(data);
    }
    return NextResponse.json(
      { error: "Failed to soft delete message" },
      { status: 400 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: "Invalid request payload", details: e },
      { status: 400 }
    );
  }
}
