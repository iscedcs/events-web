"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { auth } from "../auth";

export const getUniqueCategories = async () => {
  const url = `${EVENTS_API}${URLS.events.category}`;
  const session = await auth();
  const BEARER_TOKEN = session?.user.accessToken;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success === true) {
      return data.data;
    }
    return null;
  } catch (e: any) {
    console.log("Unable to fetch categories", e);
  }
};
