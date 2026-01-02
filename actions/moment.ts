"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "./auth";
import { SingleMomentPostProps } from "@/lib/types/moment";

export const getAllMomentsForEventId = async (eventId: string) => {
	const url = `${EVENTS_API}${URLS.moments.all_for_events.replace(
		"{eventId}",
		eventId
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
		});

		const data: SingleMomentPostProps[] = await res.json();

		if (!res.ok) return null;

		// Group by userId
		const groupedByUser = data.reduce((acc, item) => {
			if (!acc[item.userId]) {
				acc[item.userId] = [];
			}
			acc[item.userId].push(item);
			return acc;
		}, {} as Record<string, SingleMomentPostProps[]>);

		return groupedByUser;
	} catch (e: any) {
		console.error("Error fetching event moments:", e);
		return null;
	}
};

export const getMomentById = async (momentId: string) => {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	const url = `${EVENTS_API}${URLS.moments.one.replace("{id}", momentId)}`;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		const moment: SingleMomentPostProps = data;
		if (res.ok) {
			return moment;
		}
		return null;
	} catch (e: any) {
		console.log("Unable to fetch moment by ID", e);
	}
};

export const pinToggle = async (
	momentId: string,
	currentPinnedState: boolean
) => {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	const url = currentPinnedState
		? `${EVENTS_API}${URLS.moments.unpin.replace("{id}", momentId)}`
		: `${EVENTS_API}${URLS.moments.pin.replace("{id}", momentId)}`;

	try {
		const res = await fetch(url, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) return null;

		const updatedMoment: SingleMomentPostProps = await res.json();
		return updatedMoment;
	} catch (err) {
		console.error("Pin toggle failed:", err);
		return null;
	}
};

export const getPinnedMoments = async (eventId: string) => {
	const url = `${EVENTS_API}${URLS.moments.all_for_events.replace(
		"{eventId}",
		eventId
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
		});

		if (!res.ok) return null;

		const data: SingleMomentPostProps[] = await res.json();
		const filteredRecords = data.filter((e) => {
			return e.isPinned === true;
		});

		return filteredRecords;
	} catch (e: any) {
		console.log("Unable to return pinned post");
	}
};
