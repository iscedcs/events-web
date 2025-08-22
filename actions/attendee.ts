"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { auth } from "../auth";

export const getAttendeeImagesByEventID = async (id: string) => {
  const session = await auth();
  const BEARER_TOKEN = session?.user.accessToken;
  const url = `${EVENTS_API}${URLS.attendees.all.replace("{id}", id)}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await res.json();
    console.log("ATTENDEE", data);
    if (res.ok) {
      return data.data.data;
    }
    return null;
  } catch (e: any) {
    console.log("", e);
  }
};


