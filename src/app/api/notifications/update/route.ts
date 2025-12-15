import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "../../../../../actions/auth";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	const requestPayload = await req.json();
	const url = `${EVENTS_API}${URLS.notifications.update_preferences}`;

	const payload = {
		notificationsEnabled: requestPayload.notificationsEnabled,
		pushEnabled: requestPayload.pushEnabled,
		inAppEnabled: requestPayload.inAppEnabled,
		emailEnabled: requestPayload.emailEnabled,
		chatMessageEnabled: requestPayload.chatMessageEnabled,
		eventReminderEnabled: requestPayload.eventReminderEnabled,
		eventStartingEnabled: requestPayload.eventStartingEnabled,
		systemEnabled: requestPayload.systemEnabled,
	};

	try {
		const res = await fetch(url, {
			method: "PATCH",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${BEARER}`,
			},
		});
		const data = await res.json();
		if (!res.ok) {
			return NextResponse.json(
				{ error: "Failed to update user preferences" },
				{ status: 400 }
			);
		}
		return NextResponse.json(data);
	} catch (e: any) {
		console.log("Update user preference PATCH request error", e);
		return NextResponse.json(
			{ error: "Invalid request payload", details: e },
			{ status: 400 }
		);
	}
};
