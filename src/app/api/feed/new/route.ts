import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "../../../../../actions/auth";
import { SingleFeedPostValues } from "@/lib/types/feed";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;
	const url = `${EVENTS_API}${URLS.feeds.create}`;
	const requestPayload: SingleFeedPostValues = await req.json();

	const payload = {
		eventId: requestPayload.eventId,
		content: requestPayload.content,
		mediaUrl: requestPayload.mediaUrl,
		mediaType: requestPayload.mediaType,
		caption: requestPayload.caption,
	};

	try {
		const res = await fetch(url, {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${BEARER}`,
			},
		});
		const data = await res.json();
		if (!res.ok) {
			return NextResponse.json(
				{ error: "Failed to post to feed" },
				{ status: 400 }
			);
		}
		return NextResponse.json(data);
	} catch (e: any) {
		console.log("Create Feed POST request error", e);
		return NextResponse.json(
			{ error: "Invalid request payload", details: e },
			{ status: 400 }
		);
	}
}
