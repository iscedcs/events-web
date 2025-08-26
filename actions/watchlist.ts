"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { auth } from "../auth";

export const checkWatchList = async (eventId: string) => {
  const session = await auth();
  const BEARER_TOKEN = session?.user.accessToken;
  const url = `${EVENTS_API}${URLS.watchlist.event_watchlist_check.replace(
    "{eventId}",
    eventId
  )}`;
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      method: "GET",
    });
    const data = await res.json();
    const isInWatchlist = data.data.isInWatchlist;
    if (data.success) {
      return isInWatchlist;
    } else {
      return null;
    }
  } catch (e: any) {
    console.log("Unable to check if event is in watchlist", e);
  }
};
