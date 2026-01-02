import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "../../../../../actions/auth";
import { LikesValue } from "@/lib/types/like";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	const url = `${EVENTS_API}${URLS.likes.toggle}`;
	const requestPayload: LikesValue = await req.json();

	const payload = {
		likeType: requestPayload.likeType,
		momentId: requestPayload.momentId,
		feedPostId: requestPayload.feedPostId,
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
		// console.log({ data });
		if (!res.ok) {
			return NextResponse.json(
				{ error: "Failed to like post" },
				{ status: 400 }
			);
		}
		return NextResponse.json(data);
	} catch (e: any) {
		console.log("Like POST request error", e);
		return NextResponse.json(
			{ error: "Invalid request payload", details: e },
			{ status: 400 }
		);
	}
}
