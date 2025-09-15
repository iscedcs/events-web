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
