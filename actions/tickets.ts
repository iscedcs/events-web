"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { auth } from "../auth";

export const getTicketByID = async (id: string) => {
  const url = `${EVENTS_API}${URLS.tickets.ticket_by_id.replace("{id}", id)}`;
  const session = await auth();
  const BEARER_TOKEN = session?.user.accessToken;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    const data = await res.json();

    if (res.ok) {
      return data;
    }
    return null;
  } catch (e: any) {
    console.log("Unable to fetch ticket by id", e);
  }
};
