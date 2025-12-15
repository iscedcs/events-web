"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "./auth";

export const getUniqueCategories = async (limit?: number) => {
	const url = `${EVENTS_API}${URLS.events.category}`;
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
		const sortedData = limit ? data.data.splice(0, limit) : data.data;
		if (res.ok) {
			return sortedData;
		}
		return null;
	} catch (e: any) {
		console.log("Unable to fetch categories", e);
	}
};

export const getActiveUniqueCategories = async (limit?: number) => {
	const url = `${EVENTS_API}${URLS.events.active_categories}`;
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
		const sortedData = limit ? data.data.splice(0, limit) : data.data;
		if (res.ok) {
			return sortedData;
		}
		return null;
	} catch (e: any) {
		console.log("Unable to fetch categories", e);
	}
};
