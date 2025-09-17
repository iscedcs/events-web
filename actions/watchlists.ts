"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { SingleUserWatchlistProps } from "@/lib/types/event";
import { auth } from "../auth";

export const getWatchlistUserID = async () => {
  const url = `${EVENTS_API}${URLS.watchlist.all_watchlist}`;
  const session = await auth();
  const BEARER_TOKEN = session?.user.accessToken;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      // cache: "force-cache",
      next: { revalidate: 60 },
    });

    const data = await res.json();
    const watchlist: SingleUserWatchlistProps[] = data.data.watchlist;
    if (res.ok) {
      return watchlist;
    }
    return null;
  } catch (e: any) {
    console.log("Unable to fetch user watchlist", e);
  }
};

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
