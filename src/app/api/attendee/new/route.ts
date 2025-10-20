"use server";

import { eventRegistrationFormValues } from "@/components/forms/event-register/register";
import { EVENTS_API, URLS } from "@/lib/const";
import { NextResponse } from "next/server";
import { getAuthInfo } from "../../../../../actions/auth";

export async function POST(req: Request) {
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;
  const url = `${EVENTS_API}${URLS.attendees.create}`;
  const requestPayload: eventRegistrationFormValues = await req.json();
  const payload = {
    eventId: requestPayload.eventId,
    eventName: requestPayload.eventName,
    userId: requestPayload.userId,
    image: "",
    name: requestPayload.name,
    email: requestPayload.email,
    phone: "",
    ticketId: requestPayload.ticketId,
    displayPicture: requestPayload.displayPicture,
    thankyouMail: false,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER}`,
      },
    });
    const data = await res.json();
    // console.log({ data });
    if (!res.ok) {
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
