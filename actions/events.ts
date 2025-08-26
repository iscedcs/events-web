"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { SingleEventProps } from "@/lib/types/event";
import { PaginationType } from "@/lib/types/layout";
import { auth } from "../auth";

const today = new Date();

export const getAllEvents = async ({ limit, page }: PaginationType) => {
  const url = `${EVENTS_API}${URLS.events.all}?page=${page}&limit=${limit}`;
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
    const events: SingleEventProps[] = data.data.events;
    // console.log(data.data.events);

    const sortedEvents = [...events].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    if (data.success === true) {
      return sortedEvents;
    }
    return null;
  } catch (e: any) {
    console.log("Unable to fetch events", e);
  }
};

export const getMostRecentEvent = async ({ limit, page }: PaginationType) => {
  const url = `${EVENTS_API}${URLS.events.all}?page=${page}&limit=${limit}`;
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
    const events: SingleEventProps[] = data.data.events;
    const recentEvent = events.reduce((closest, current) => {
      const currentDiff = Math.abs(
        new Date(current.createdAt).getTime() - today.getTime()
      );
      const closestDiff = Math.abs(
        new Date(closest.createdAt).getTime() - today.getTime()
      );
      return currentDiff < closestDiff ? current : closest;
    });
    // console.log(data.data.events);
    // console.log({ recentEvent });
    if (data.success === true) {
      return recentEvent;
    }
  } catch (e: any) {
    console.log("Unable to fetch event", e);
  }
};

export const getEventsForCalendar = async ({ limit, page }: PaginationType) => {
  const url = `${EVENTS_API}${URLS.events.all}?page=${page}&limit=${limit}`;
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
    const events: SingleEventProps[] = data.data.events;

    // console.log(data.data.events);
    // console.log({ recentEvent });

    // console.log(
    //   "Server Side  ",
    //   events.map((i) => ({
    //     image: i.image,
    //     cleanName: i.cleanName,
    //     startDate: i.startDate,
    //   }))
    // );
    if (data.success === true) {
      return events.map((i) => ({
        image: i.image,
        cleanName: i.cleanName,
        startDate: i.startDate,
      }));
    }
  } catch (e: any) {
    console.log("Unable to fetch event image, clean name and start date", e);
  }
};

export const getEventsByCleanName = async (slug: string) => {
  const url = `${EVENTS_API}${URLS.events.one_slug.replace(
    "{cleanName}",
    slug
  )}`;
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
    console.log({ data });
    if (data.success) {
      // console.log(data.data);
      return data.data;
    } else return null;
  } catch (e: any) {
    console.log("Unable to fetch Event information by slug", e);
  }
};

export const getEventsWithAttendeesByCleanName = async (slug: string) => {
  const url = `${EVENTS_API}${URLS.events.all_events_with_attendee.replace(
    "{cleanName}",
    slug
  )}`;
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
    console.log({ data });
    if (data.success) {
      // console.log(data.data);
      return data.data;
    } else return null;
  } catch (e: any) {
    console.log("Unable to fetch Event information by slug", e);
  }
};

export const searchForEvents = async (value: string) => {
  const session = await auth();
  const BEARER_TOKEN = session?.user.accessToken;
  const url = `${EVENTS_API}${URLS.events.event_search}?query=${value}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const item: SingleEventProps[] = data.data.events.data;
    console.log({ item });
    if (data.success === true) {
      return item;
    }
    return null;
  } catch (e: any) {
    console.log("Unable to search for events", e);
  }
};
