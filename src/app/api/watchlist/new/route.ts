"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function POST(req: Request) {
  const session = await auth();
  const BEARER_TOKEN = session?.user.accessToken;
  const url = `${EVENTS_API}${URLS.watchlist.add_watchlist}`;
  const request = await req.json();
  const payload = {
    eventId: request.eventId,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    const data = await res.json();
    console.log({ data });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to add watchlist" },
        { status: 400 }
      );
    }
    return NextResponse.json(data);
  } catch (e: any) {
    console.log("Add watchlist POST request error", e);
    return NextResponse.json(
      { error: "Invalid request payload", details: e },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  const BEARER_TOKEN = session?.user.accessToken;
  const url = `${EVENTS_API}${URLS.watchlist.remove_watchlist}`;
  const request = await req.json();
  const payload = {
    eventId: request.eventId,
  };

  try {
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    const data = await res.json();
    console.log({ data });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to add watchlist" },
        { status: 400 }
      );
    }
    return NextResponse.json(data);
  } catch (e: any) {
    console.log("Add watchlist DELETE request error", e);
    return NextResponse.json(
      { error: "Invalid request payload", details: e },
      { status: 400 }
    );
  }
}
