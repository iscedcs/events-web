"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = `${EVENTS_API}${URLS.attendees.create}`;
  const requestPayload = await req.json();
  const payload = {
    eventId: "",
    eventName: "",
    userId: "",
    image: "",
    name: "",
    email: "",
    phone: "",
    ticketId: "",
    displayPicture: "",
    thankyouMail: false,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log({ data });
    if (res.ok) {
      return NextResponse.json(
        { error: "Failed to join event" },
        { status: 400 }
      );
    }
    return NextResponse.json(data);
  } catch (e: any) {
    console.log("Create attendee POST request error", e);
    return NextResponse.json(
      { error: "Invalid request payload", details: e },
      { status: 400 }
    );
  }
}
