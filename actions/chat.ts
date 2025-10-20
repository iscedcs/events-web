"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "./auth";
import { SingleChatroomProps } from "@/lib/types/chat";

export const getEventChatroomByEventID = async (eventId: string) => {
  const url = `${EVENTS_API}${URLS.chat.event_chatroom.replace(
    "{eventId}",
    eventId
  )}`;
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER}`,
      },
      next: { revalidate: 60 },
    });
    const data = await res.json();
    console.log({ data });
    const roomInfo: SingleChatroomProps = data.data.data;

    if (res.ok) {
      return roomInfo;
    } else {
      return null;
    }
  } catch (e: any) {
    console.log("Unable to fetch chatroom by event ID", e);
    return null;
  }
};
