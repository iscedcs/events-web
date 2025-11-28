"use server";
import { AUTH_API, URLS } from "@/lib/const";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const url = `${AUTH_API}${URLS.auth.reset_password}`;
		const { newPassword, resetCode } = await req.json();
		const res = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				resetCode,
				newPassword,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		console.log({ data });
		if (!res.ok) {
			return NextResponse.json(
				{
					error: "Failed to reset password",
				},
				{
					status: 400,
				}
			);
		}

		return NextResponse.json(data);
	} catch (e) {
		console.log("Reset password request POST error", e);
		return NextResponse.json(
			{
				error: "Invalid request",
				details: e,
			},
			{
				status: 400,
			}
		);
	}
}
