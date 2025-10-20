"use server";

import { eventCreationFormValues } from "@/components/forms/create-event/create";
import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "../../../../../actions/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;
  const url = `${EVENTS_API}${URLS.events.new}`;
  const requestPayload: eventCreationFormValues = await req.json();

  const payload = {
    title: requestPayload.title,
    description: requestPayload.description,
    location: requestPayload.location,
    latitude: requestPayload.latitude,
    longitude: requestPayload.longitude,
    town: requestPayload.town,
    image: requestPayload.image,
    startDate: requestPayload.startDate,
    endDate: requestPayload.endDate,
    time: requestPayload.time,
    host: requestPayload.host,
    categories: requestPayload.categories,
    audienceSize: requestPayload.audienceSize,
    tickets: requestPayload.tickets?.map((ticket) => ({
      amount: ticket?.amount,
      title: ticket?.title,
      quantity: ticket?.quantity,
      isFree: ticket?.isFree,
      currency: ticket?.currency,
    })),
    isPublic: requestPayload.isPublic,
    hasFreeTickets: true,
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
    console.log({ data });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to join event" },
        { status: 400 }
      );
    }
    return NextResponse.json(data);
  } catch (e: any) {
    console.log("Create event POST request error", e);
    return NextResponse.json(
      { error: "Invalid request payload", details: e },
      { status: 400 }
    );
  }
}
