"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { auth } from "../auth";

export const getAttendeesEventID = async (id: string) => {
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
    if (res.ok) {
      return data.data.data;
    }
    return null;
  } catch (e: any) {
    console.log("Unable to fetch event attendees", e);
  }
};

export const getAttendeeID = async (id: string) => {
  const session = await auth();
  const BEARER_TOKEN = session?.user.accessToken;
  const url = `${EVENTS_API}${URLS.attendees.one.replace("{id}", id)}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await res.json();
    if (res.ok) {
      return data.data.data;
    }
    return null;
  } catch (e: any) {
    console.log("Unable to fetch attendee", e);
  }
};

export const checkEventAttendee = async (id: string, slug: string) => {
  const session = await auth();
  const BEARER_TOKEN = session?.user.accessToken;
  const url = `${EVENTS_API}${URLS.attendees.attendee_check.replace(
    "{cleanName}",
    slug
  )}?userId=${id}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await res.json();
    if (data.success === true) {
      return {
        attendees: data.data.event.attendees,
        check: data.data.isAttendee,
      };
    }
    return null;
  } catch (e: any) {
    console.log("Unable to check if user is an attendee", e);
  }
};
