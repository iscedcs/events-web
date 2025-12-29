import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "../../../../../actions/auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	const requestPayload = await req.json();
	const { id } = requestPayload;

	const url = `${EVENTS_API}${URLS.feeds.update.replace("{id}", id)}`;

	const payload = {
		content: requestPayload.content,
		caption: requestPayload.caption,
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

		// console.log({ data });
		if (!res.ok) {
			return NextResponse.json(
				{ error: "Failed to edit feed" },
				{ status: 400 }
			);
		}
		return NextResponse.json(data);
	} catch (e: any) {
		console.log("Update Feed PATCH request error", e);
		return NextResponse.json(
			{ error: "Invalid request payload", details: e },
			{ status: 400 }
		);
	}
}
