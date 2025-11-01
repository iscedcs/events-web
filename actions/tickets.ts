"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { PaginationType } from "@/lib/types/layout";
import { SingleTicketProps } from "@/lib/types/ticket";
import { stripTime } from "@/lib/utils";
import { getAuthInfo } from "./auth";

export const getTicketByID = async (id: string) => {
  const url = `${EVENTS_API}${URLS.tickets.ticket_by_id.replace("{id}", id)}`;
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

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

    if (res.ok) {
      return data;
    }
    return null;
  } catch (e: any) {
    console.log("Unable to fetch ticket by id", e);
  }
};

export const getTicketsByEventID = async (id: string) => {
  const url = `${EVENTS_API}${URLS.tickets.all_ticket_for_event.replace(
    "{eventId}",
    id
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
    });
    const data = await res.json();
    const tickets: SingleTicketProps[] = data.tickets;
    const paid = data.meta.paid;
    const free = data.meta.free;
    const available = data.meta.available;
    const total = data.meta.total;

    if (res.ok) {
      return {
        tickets,
        paid,
        free,
        available,
        total,
      };
    }
    return null;
  } catch (e: any) {
    console.log("Unable to fetch events by event ID", e);
  }
};

export const getTicketsByUserID = async (id: string) => {
  const url = `${EVENTS_API}${URLS.tickets.all_ticket_user.replace(
    "{userId}",
    id
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
      next: { revalidate: 20 },
    });
    const data = await res.json();
    const tickets: SingleTicketProps[] = data.data;

    if (res.ok) {
      return tickets;
    }
    return null;
  } catch (e: any) {
    console.log("Unable to fetch ticket by user id", e);
  }
};

export const getPastTicketsByUserID = async (id: string) => {
  const url = `${EVENTS_API}${URLS.tickets.all_ticket_user.replace(
    "{userId}",
    id
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
      next: { revalidate: 20 },
    });

    const data = await res.json();
    const tickets: SingleTicketProps[] = data.data;

    if (res.ok) {
      const now = new Date();

      const pastTickets = tickets.filter((ticket) => {
        const startDateStr = ticket.event?.startDate;
        if (!startDateStr) return false;
        const startDate = new Date(startDateStr);
        return startDate < now;
      });

      return pastTickets;
    }

    return null;
  } catch (e: any) {
    console.log("Unable to fetch past tickets by user id", e);
    return null;
  }
};

export const getPastTicketsForCalendarByUserID = async (id: string) => {
  const url = `${EVENTS_API}${URLS.tickets.all_ticket_user.replace(
    "{userId}",
    id
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
      next: { revalidate: 20 },
    });

    const data = await res.json();
    const tickets: SingleTicketProps[] = data.data;

    if (res.ok) {
      const now = new Date();

      const pastTickets = tickets.filter((ticket) => {
        const startDateStr = ticket.event?.startDate;
        if (!startDateStr) return false;
        const startDate = new Date(startDateStr);
        return startDate < now;
      });

      return pastTickets.map((i) => ({
        image: i.event?.image,
        title: i.event?.title,
        cleanName: i.event?.cleanName,
        startDate: i.event?.startDate,
      }));
    }
  } catch (e: any) {
    console.log("Unable to fetch past tickets by user id", e);
  }
};

export const getFutureTicketsByUserId = async (
  id: string,
  { limit, page }: PaginationType
) => {
  const url = `${EVENTS_API}${URLS.tickets.all_ticket_user.replace(
    "{userId}",
    id
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
      next: { revalidate: 20 },
    });
    const data = await res.json();
    const tickets: SingleTicketProps[] = data.data;
    const filteredTickets = tickets.filter((item) => {
      const startDate = stripTime(
        new Date(item.event?.startDate ?? new Date())
      );
      const now = stripTime(new Date());
      return startDate >= now;
    });
    const totalRecord = data.meta.total;
    const currentPage = data.meta.page;
    const limit = data.meta.limit;
    const totalPages = data.meta.pages;

    // console.log({ data });
    if (res.ok) {
      return { filteredTickets, totalRecord, currentPage, limit, totalPages };
    }
    return null;
  } catch (e: any) {
    console.log("Unable to fetch ticket by user id", e);
  }
};

export const getFutureTicketsForCalendarByUserId = async (id: string) => {
  const url = `${EVENTS_API}${URLS.tickets.all_ticket_user.replace(
    "{userId}",
    id
  )}`;
  const auth = await getAuthInfo();
  const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;
  console.log({ url });
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
    // console.log({ data });
    const tickets: SingleTicketProps[] = data.data;
    const filteredTickets = tickets.filter((item) => {
      const startDate = stripTime(
        new Date(item.event?.startDate ?? new Date())
      );
      const now = stripTime(new Date());
      return startDate >= now;
    });

    // console.log({ data });
    if (res.ok) {
      return filteredTickets.map((i) => ({
        image: i.event?.image,
        title: i.event?.title,
        cleanName: i.event?.cleanName,
        startDate: i.event?.startDate,
      }));
    }
  } catch (e: any) {
    console.log("Unable to fetch ticket by user id", e);
  }
};
