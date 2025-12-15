"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { PaginationType } from "@/lib/types/layout";
import { NotificationProps } from "@/lib/types/notifications";
import { getAuthInfo } from "./auth";

export const getAllUserNotifications = async ({
	page,
	limit,
}: PaginationType) => {
	const url = new URL(
		`${EVENTS_API}${URLS.notifications.all_user_notification}`
	);
	const session = await getAuthInfo();
	const BEARER_TOKEN = session.accessToken;

	page && url.searchParams.set("page", page?.toString());
	limit && url.searchParams.set("limit", limit?.toString());

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER_TOKEN}`,
			},
			// next: {
			// 	revalidate: 20,
			// },
		});

		const data = await res.json();
		const records: NotificationProps[] = data.data;
		const total: number = data.meta.total;
		const page: number = data.meta.page;
		const limit: number = data.meta.limit;

		if (res.ok) {
			return {
				records,
				total,
				page,
				limit,
			};
		}
		return null;
	} catch (e: any) {
		console.log("Unable to get user notifications", e);
	}
};

export const getUnreadNotificationsCount = async () => {
	const session = await getAuthInfo();
	const BEARER_TOKEN = session.accessToken;
	const url = `${EVENTS_API}${URLS.notifications.unread_count}`;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER_TOKEN}`,
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		const count = data.count;

		if (res.ok) {
			return count;
		}
		return null;
	} catch (e: any) {
		console.log("Unable to get unread count", e);
	}
};

export const getUserPreferences = async () => {
	const session = await getAuthInfo();
	const BEARER_TOKEN = session.accessToken;

	const url = `${EVENTS_API}${URLS.notifications.all_preferences}`;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER_TOKEN}`,
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		const notificationsEnabled: boolean = data.data.notificationsEnabled;
		const pushEnabled: boolean = data.data.pushEnabled;
		const inAppEnabled: boolean = data.data.inAppEnabled;
		const emailEnabled: boolean = data.data.emailEnabled;
		const chatMessageEnabled: boolean = data.data.chatMessageEnabled;
		const eventReminderEnabled: boolean = data.data.eventReminderEnabled;
		const eventStartingEnabled: boolean = data.data.eventStartingEnabled;
		const systemEnabled = data.data.systemEnabled;
		if (res.ok) {
			return {
				notificationsEnabled,
				pushEnabled,
				inAppEnabled,
				emailEnabled,
				chatMessageEnabled,
				eventReminderEnabled,
				eventStartingEnabled,
				systemEnabled,
			};
		}
	} catch (e: any) {
		console.log("Unable to get user preferences", e);
	}
};
