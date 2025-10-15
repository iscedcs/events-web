"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { SingleTicketProps } from "@/lib/types/event";
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
      next: { revalidate: 60 },
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

export const getTicketByUserID = async (id: string) => {
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
      next: { revalidate: 60 },
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
      next: { revalidate: 60 },
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
