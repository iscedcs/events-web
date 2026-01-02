"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "./auth";
import { SingleFeedPostProps } from "@/lib/types/feed";

export const getAllFeedByEventId = async (
	eventId: string,
	{ page, limit }: { page: number; limit: number }
) => {
	const url = new URL(
		`${EVENTS_API}${URLS.feeds.all_for_event.replace("{eventId}", eventId)}`
	);
	page && url.searchParams.set("page", page.toString());
	limit && url.searchParams.set("limit", limit.toString());

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
		const feeds: SingleFeedPostProps[] = data;

		if (res.ok) {
			return feeds;
		} else {
			return null;
		}
	} catch (e: any) {
		console.log("Unable to fetch event feeds", e);
	}
};

export const getFeedPostById = async (feedId: string) => {
	const url = `${EVENTS_API}${URLS.feeds.one.replace("{id}", feedId)}`;
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
		const feed: SingleFeedPostProps = data;

		if (res.ok) {
			return feed;
		} else {
			return null;
		}
	} catch (e: any) {
		console.log("Unable to fetch feed by ID", e);
	}
};

export const deleteFeed = async (feedId: string) => {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	const url = `${EVENTS_API}${URLS.feeds.delete.replace("{id}", feedId)}`;

	try {
		const res = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${BEARER}`,
			},
		});

		let data = null;

		// console.log(res.status);
		if (res.status !== 204) {
			return null;
		}

		return res.status === 204 ? res.status : null;
	} catch (e: any) {
		console.log("Unable to delete feed", e);
		return null;
	}
};
