"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import {
  SingleChatroomProps,
  SinglePrivateChatroomProps,
} from "@/lib/types/chat";
import { getAuthInfo } from "./auth";
import { getAttendeeID } from "./attendee";
import { getUserByID } from "./user";

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
      // next: { revalidate: 20 },
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

export const getPrivateChatroomForUser = async (userId: string) => {
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;
  const url = `${EVENTS_API}${URLS.chat.private_chatroom_user.replace(
    "{userId}",
    userId
  )}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER}`,
      },
      next: { revalidate: 20 },
    });
    const data = await res.json();
    const info: SinglePrivateChatroomProps[] = data.data.data;
    // console.log({ info });
    if (res.ok) {
      return info;
    }
    return null;
  } catch (e: any) {
    console.log("Unable to fetch private chatrooms for user", e);
  }
};

export const getAttendeeInformationForChat = async ({
  participantA,
  participantB,
  creatorId,
}: {
  participantA: string;
  participantB: string;
  creatorId: string | null;
}) => {
  const auth = await getAuthInfo();
  const userId = auth.user?.id;

  const attendeeA = await getAttendeeID(participantA);
  const attendeeB = await getAttendeeID(participantB);
  const creator = await getUserByID(creatorId ?? "");

  if (userId !== attendeeA.userId) {
    return {
      name: attendeeA.name,
      image: attendeeA.displayPicture || attendeeA.image,
    };
  } else {
    if (attendeeB === null) {
      return {
        name: `${creator?.firstName} ${creator?.lastName}`,
        image: creator?.displayPicture,
      };
    } else {
      if (userId !== attendeeB.userId) {
        return {
          name: attendeeB.name,
          image: attendeeB.displayPicture || attendeeB.image,
        };
      }
    }
  }

  // return null;
};

export const getAttendeeInformationForChatroom = async ({
  participantA,
  creatorId,
  participantB,
}: {
  participantA: string;
  participantB: string;
  creatorId: string | null;
}) => {
  const auth = await getAuthInfo();
  const userId = auth.user?.id;

  // console.log({
  //   participantA,
  //   participantB,
  // });

  const attendeeA = await getAttendeeID(participantA);
  const attendeeB = await getAttendeeID(participantB);
  const creator = await getUserByID(creatorId ?? "");

  if (userId === attendeeA.userId) {
    return {
      attendee: attendeeA,
    };
  } else {
    if (attendeeB === null) {
      return {
        attendee: creator,
      };
    } else {
      if (userId === attendeeB.userId)
        return {
          attendee: attendeeB,
        };
    }
  }
};

export const getChatroomByID = async (id: string) => {
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;
  const url = `${EVENTS_API}${URLS.chat.chatroom_one.replace("{id}", id)}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER}`,
      },
    });
    const data = await res.json();
    const info: SingleChatroomProps = data.data.data;
    if (res.ok) {
      return info;
    }
    return null;
  } catch (e: any) {
    console.log("Unable to get chatroom information by id", e);
  }
};
