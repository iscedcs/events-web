"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "./auth";
import { isBefore } from "date-fns";
import { SingleUserWatchlistProps } from "@/lib/types/watchlist";

export const getWatchlistUserID = async (userId: string) => {
	if (!userId) return [];

	const url = `${EVENTS_API}${URLS.watchlist.all_watchlist.replace(
		"{userId}",
		userId
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
			cache: "no-store",
		});

		if (!res.ok) {
			console.log("watchlist fetch failed", res.status, await res.text());
			return [];
		}

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

export const getWatchlistForCalendarUserID = async (userId: string) => {
	if (!userId) return [];

	const url = `${EVENTS_API}${URLS.watchlist.all_watchlist.replace(
		"{userId}",
		userId
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
			cache: "no-store",
		});

		const data = await res.json();
		const watchlist: SingleUserWatchlistProps[] = data.data.watchlist;

		const futureEvent = watchlist.filter((e) =>
			isBefore(new Date(), e.event.startDate)
		);

		if (res.ok) {
			return futureEvent.map((i) => ({
				image: i.event?.image,
				title: i.event?.title,
				cleanName: i.event?.cleanName,
				startDate: i.event?.startDate,
			}));
		}
	} catch (e: any) {
		console.log("Unable to fetch user watchlist", e);
	}
};

export const checkWatchList = async (eventId: string) => {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;
	const url = `${EVENTS_API}${URLS.watchlist.event_watchlist_check.replace(
		"{eventId}",
		eventId
	)}`;
	try {
		const res = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${BEARER}`,
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
