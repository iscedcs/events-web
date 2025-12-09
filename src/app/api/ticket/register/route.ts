"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "../../../../../actions/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;
	const url = `${EVENTS_API}${URLS.tickets.register_via_tickets}`;

	const requestPayload = await req.json();

	const payload = {
		ticketId: requestPayload.ticketId,
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
				{ error: "Failed to access ticket" },
				{ status: 400 }
			);
		}
		return NextResponse.json(data);
	} catch (e: any) {
		console.log("Ticket access POST request error", e);
		return NextResponse.json(
			{ error: "Invalid request payload", details: e },
			{ status: 400 }
		);
	}
}
