"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "./auth";
import { SingleAttendeeProps, SingleEventProps } from "@/lib/types/event";

export const getAttendeesEventID = async (id: string) => {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;
	const url = `${EVENTS_API}${URLS.attendees.all.replace("{id}", id)}`;

	try {
		const res = await fetch(url, {
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
			method: "GET",
			next: { revalidate: 20 },
		});
		const data = await res.json();

		if (res.ok) {
			return data.data.data;
		}
		return null;
	} catch (e: any) {
		console.log("Unable to fetch event attendees", e);
	}
};

export const getAttendeeID = async (id: string) => {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;
	const url = `${EVENTS_API}${URLS.attendees.one.replace("{id}", id)}`;

	try {
		const res = await fetch(url, {
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
			method: "GET",
			next: { revalidate: 20 },
		});
		const data = await res.json();
		if (res.ok) {
			return data.data.data;
		}
		return null;
	} catch (e: any) {
		console.log("Unable to fetch attendee", e);
	}
};

export const checkEventAttendee = async (id: string, slug: string) => {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;
	const url = `${EVENTS_API}${URLS.attendees.attendee_check.replace(
		"{cleanName}",
		slug
	)}?userId=${id}`;

	try {
		const res = await fetch(url, {
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
			method: "GET",
			// next: { revalidate: 60 },
		});
		const data = await res.json();
		if (data.success === true) {
			return {
				attendees: data.data.event.attendees,
				check: data.data.isAttendee,
			};
		}
		return null;
	} catch (e: any) {
		console.log("Unable to check if user is an attendee", e);
	}
};

export const checkInAttendeeWithID = async ({
	eventId,
	attendeeId,
}: {
	eventId: string;
	attendeeId: string;
}) => {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	const url = `${EVENTS_API}${URLS.attendees.check_in_with_attendeeId.replace(
		"{id}",
		attendeeId
	)}?eventId=${eventId}`;

	try {
		const res = await fetch(url, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${BEARER}`,
			},
		});

		const data = await res.json();
		// console.log({ data });

		if (data) {
			if (data.statusCode === 409) {
				return {
					statusCode: "409",
					error: "Attendee already checked in",
				};
			}
			if (data.statusCode === 400) {
				return {
					statusCode: "400",
					error: "Attendee does not belong to this event",
				};
			}
			if (data.sucess === true) {
				return {
					result: data.data,
				};
			}
		}
		return null;
	} catch (e: any) {
		console.log("Unable to check in attendee into an event", e);
		return null;
	}
};

export const checkInAttendeeWithToken = async ({
	eventId,
	token,
}: {
	eventId: string;
	token: string;
}) => {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	const url = `${EVENTS_API}${URLS.attendees.check_in_with_token}`;
	const payload = {
		eventId,
		token,
	};

	// console.log({ payload });

	try {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${BEARER}`,
			},
			body: JSON.stringify(payload),
		});

		const data = await res.json();
		const attendee: SingleAttendeeProps = data.data;
		// console.log({ data });

		if (data) {
			if (data.statusCode === 409) {
				return {
					statusCode: "409",
					error: "Attendee already checked in",
				};
			}
			if (data.statusCode === 400) {
				return {
					statusCode: "400",
					error: "Attendee does not belong to this event",
				};
			}
			if (data.sucess === true) {
				return {
					result: attendee,
				};
			}
		}
		return null;
	} catch (e: any) {
		console.log("Unable to check in attendee into an event", e);
		return null;
	}
};

export const getAttendeeByToken = async (token: string) => {
	const url = `${EVENTS_API}${URLS.attendees.one_token}`;
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;
	const payload = {
		token,
	};

	// console.log()

	try {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${BEARER}`,
			},
			body: JSON.stringify(payload),
		});

		const data = await res.json();
		// console.log({ data });
		const attendee: SingleAttendeeProps = data.data;
		const event: SingleEventProps = data.data.event;

		if (res.ok) {
			return {
				attendee,
				event,
			};
		}
		return null;
	} catch (e: any) {
		console.log("Unable to get attendee info", e);
	}
};
