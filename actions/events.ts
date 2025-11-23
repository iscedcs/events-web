"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { MiniSingleAttendeeProps, SingleEventProps } from "@/lib/types/event";
import { PaginationType } from "@/lib/types/layout";
import { getAuthInfo } from "./auth";
import { isAfter, isBefore, isEqual, isSameDay } from "date-fns";
import { getAttendeesEventID } from "./attendee";

const today = new Date();

export const getAllEvents = async ({ limit, page }: PaginationType) => {
  const url = `${EVENTS_API}${URLS.events.all}?page=${page}&limit=${limit}`;
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log({ data });
    const events: SingleEventProps[] = data.data.events;
    // console.log(data.data.events);

    const sortedEvents = [...events].sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
    const totalRecords = data.data.total;
    const currentPage = data.data.currentPage;
    const totalPages = data.data.totalPages;

    const publicEvents = sortedEvents.filter((e) => e.isPublic === true);

    if (data.success === true) {
      return {
        event: publicEvents,
        totalPages: totalPages,
        currentPage: currentPage,
        totalRecords: totalRecords,
      };
    }
    return null;
  } catch (e: any) {
    console.log("Unable to fetch events", e);
  }
};

export const getUserEVents = async ({ limit, page }: PaginationType) => {
  const url = `${EVENTS_API}${URLS.events.all_events_user}?page=${page}&limit=${limit}`;
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 20 },
    });
    const data = await res.json();
    const events: SingleEventProps[] = data.data.all;
    const sortedEvents = [...events].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const user = data.data.user;

    if (res.ok) {
      return {
        events: sortedEvents,
        user,
      };
    } else {
      return null;
    }
  } catch (e: any) {
    console.log("Unable to fetch user events", e);
    return null;
  }
};

export const getUserEVentsForCalendar = async ({
  limit,
  page,
}: PaginationType) => {
  const url = `${EVENTS_API}${URLS.events.all_events_user}?page=${page}&limit=${limit}`;
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 20 },
    });
    const data = await res.json();
    const events: SingleEventProps[] = data.data.all;
    // console.log({ data });

    if (res.ok) {
      return events.map((i) => ({
        image: i.image,
        title: i.title,
        cleanName: i.cleanName,
        startDate: i.startDate,
      }));
    }
  } catch (e: any) {
    console.log("Unable to fetch user events", e);
  }
};

export const getEventIdByCleanName = async (slug: string) => {
  const url = `${EVENTS_API}${URLS.events.one_slug.replace(
    "{cleanName}",
    slug
  )}`;
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 20 },
    });
    const data = await res.json();
    // console.log({ data });
    if (data.success) {
      // console.log(data.data);
      return {
        id: data.data.id,
      };
    } else return null;
  } catch (e: any) {
    console.log("Unable to fetch Event ID by slug", e);
  }
};

export const getTrendingEvents = async () => {
  //TODO: GET TRENDING EVENTS WHERE THERE ARE ATTENDEES
  const url = `${EVENTS_API}${URLS.events.all}`;
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 20 },
    });
    const data = await res.json();
    const events: SingleEventProps[] = data.data.events;
    // console.log(data.data.events);

    const sortedEvents = events.filter((e) => {
      // const start = new Date(e.startDate);
      // const end = new Date(e.endDate);

      return (
        isBefore(new Date(), e.startDate) || isSameDay(e.startDate, e.endDate)
      );
    });

    const publicEvent = sortedEvents.filter((e) => e.isPublic === true);

    const slicedEvents = publicEvent.slice(0, 10);

    const totalRecords = data.data.total;
    const currentPage = data.data.currentPage;
    const totalPages = data.data.totalPages;

    if (data.success === true) {
      return {
        event: slicedEvents,
        totalPages: totalPages,
        currentPage: currentPage,
        totalRecords: totalRecords,
        // hasLimit: hasLimit ? slicedEvents : sortedEvents,
      };
    }
    return null;
  } catch (e: any) {
    console.log("Unable to fetch events", e);
  }
};

export const getMostRecentEvent = async ({ limit, page }: PaginationType) => {
  const url = `${EVENTS_API}${URLS.events.all}?page=${page}&limit=${limit}`;
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 20 },
    });
    const data = await res.json();
    const events: SingleEventProps[] = data.data.events;
    const recentEvent = events.reduce((closest, current) => {
      const currentDiff = Math.abs(
        new Date(current.startDate).getTime() - today.getTime()
      );
      const closestDiff = Math.abs(
        new Date(closest.startDate).getTime() - today.getTime()
      );
      return currentDiff < closestDiff ? current : closest;
    });

    const publicCheck = recentEvent.isPublic === true;

    // console.log(data.data.events);
    // console.log({ recentEvent });
    if (data.success === true) {
      if (publicCheck) {
        return recentEvent;
      } else {
        return null;
      }
    }
  } catch (e: any) {
    console.log("Unable to fetch event", e);
  }
};

export const getEventsForCalendar = async ({ limit, page }: PaginationType) => {
  const url = `${EVENTS_API}${URLS.events.all}?page=${page}&limit=${limit}`;
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 20 },
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
        title: i.title,
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
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER}`,
        "Content-Type": "application/json",
      },
      // next: { revalidate: 20 },
    });
    const data = await res.json();
    // console.log({ data });
    if (data.success) {
      // console.log(data.data);
      return data.data;
    } else return null;
  } catch (e: any) {
    console.log("Unable to fetch Event information by slug", e);
  }
};

export const getEventWithTenAttendeesByCleanName = async (slug: string) => {
  const url = `${EVENTS_API}${URLS.events.all_events_with_attendee.replace(
    "{cleanName}",
    slug
  )}`;
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 20 },
    });
    const data = await res.json();
    // console.log({ data });
    const event = data.event;
    const attendees: MiniSingleAttendeeProps[] = data.attendees;
    const totalAttendees = data.totalAttendees;
    if (data.success) {
      // console.log(data.data);
      return {
        event: event,
        attendees: attendees,
        totalAttendees,
      };
    } else return null;
  } catch (e: any) {
    console.log("Unable to fetch Event information by slug", e);
  }
};

export const getEventsByID = async (id: string) => {
  const url = `${EVENTS_API}${URLS.events.one.replace("{id}", id)}`;
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 20 },
    });
    const data = await res.json();
    // console.log({ data });
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
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 20 },
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
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;
  const url = `${EVENTS_API}${URLS.events.event_search}?query=${value}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 20 },
    });
    const data = await res.json();
    const item: SingleEventProps[] = data.data.events.data;

    const showPublic = item.filter((e) => {
      e.isPublic;
    });
    if (data.success === true) {
      return { item: showPublic };
    }
    return null;
  } catch (e: any) {
    console.log("Unable to search for events", e);
  }
};

export const getNearbyEvents = async (
  lng: string,
  lat: string,
  radius: string
) => {
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;
  const url = new URL(`${EVENTS_API}${URLS.events.nearby_events}`);
  url.searchParams.set("lng", lng);
  url.searchParams.set("lat", lat);
  radius && url.searchParams.set("radius", radius);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 20 },
    });

    const data = await res.json();
    const events: SingleEventProps[] = data.data;
    const now = new Date();
    const filteredEvents = events.filter(
      (e) =>
        (isBefore(new Date(), e.startDate) ||
          isSameDay(e.startDate, e.endDate)) &&
        e.isPublic === true
    );

    if (res.ok) {
      return {
        events: filteredEvents,
      };
    }
    return null;
  } catch (e: any) {
    console.log("Unable to fetch nearby events", e);
    return null;
  }
};
