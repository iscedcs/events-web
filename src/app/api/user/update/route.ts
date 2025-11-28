"use server";

import { updateUserValues } from "@/components/forms/edit-user/edit";
import { AUTH_API, URLS } from "@/lib/const";
import { NextResponse } from "next/server";
import { getAuthInfo } from "../../../../../actions/auth";

export const PATCH = async (req: Request) => {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	const requestPayload: updateUserValues & { id: string } = await req.json();
	const { id } = requestPayload;
	const url = `${AUTH_API}${URLS.user.update_user.replace("{id}", id)}`;

	const payload: updateUserValues = {
		address: requestPayload.address,
		displayPicture: requestPayload.displayPicture,
		dob: requestPayload.dob,
		email: requestPayload.email,
		firstName: requestPayload.firstName,
		lastName: requestPayload.lastName,
		phone: requestPayload.phone,
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
				{ error: "Failed to update user" },
				{ status: 400 }
			);
		}
		return NextResponse.json(data);
	} catch (e: any) {
		console.log("Update event PATCH request error", e);
		return NextResponse.json(
			{ error: "Invalid request payload", details: e },
			{ status: 400 }
		);
	}
};
