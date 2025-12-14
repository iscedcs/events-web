import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "../../../../../actions/auth";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;
	const requestPayload = await req.json();

	const url = `${EVENTS_API}${URLS.notifications.mark_as_read}`;

	const payload = {
		notificationId: requestPayload.notificationId,
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
				{ error: "Failed to mark notification as read" },
				{ status: 400 }
			);
		}
		return NextResponse.json(data);
	} catch (e: any) {
		console.log("Mark read POST request error", e);
		return NextResponse.json(
			{ error: "Invalid request payload", details: e },
			{ status: 400 }
		);
	}
};
