"use server";

import { EVENTS_API, URLS } from "@/lib/const";
import { SingleEventProps } from "@/lib/types/event";
import { PaginationType } from "@/lib/types/layout";
import { getAuthInfo } from "./auth";
import {
	closestTo,
	isAfter,
	isBefore,
	isEqual,
	isPast,
	isSameDay,
} from "date-fns";
import { getAttendeesEventID } from "./attendee";
import { MiniSingleAttendeeProps } from "@/lib/types/attendee";

const today = new Date();

export const getAllEvents = async ({ limit, page }: PaginationType) => {
	const url = `${EVENTS_API}${URLS.events.all}?page=${page}&limit=${limit}`;
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		// console.log({ data });
		const events: SingleEventProps[] = data.data.events;
		// console.log(data.data.events);

		const sortedEvents = [...events].sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime()
		);

		const presentEvents = sortedEvents.filter((i) => {
			return isBefore(today, i.endDate);
		});

		const publicEvents = presentEvents.filter((e) => e.isPublic === true);

		const totalRecords = data.data.total;
		const currentPage = data.data.currentPage;
		const totalPages = data.data.totalPages;

		// console.log({ publicEvents });

		if (data.success === true) {
			return {
				event: publicEvents,
				totalPages: totalPages,
				currentPage: currentPage,
				totalRecords: totalRecords,
			};
		}
		return null;
	} catch (e: any) {
		console.log("Unable to fetch events", e);
	}
};

export const getUserEVents = async ({ limit, page }: PaginationType) => {
	const url = `${EVENTS_API}${URLS.events.all_events_user}?page=${page}&limit=${limit}`;
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
			next: { revalidate: 20 },
		});
		const data = await res.json();
		const events: SingleEventProps[] = data.data.all;
		const sortedEvents = [...events].sort(
			(a, b) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime()
		);
		const user = data.data.user;

		if (res.ok) {
			return {
				events: sortedEvents,
				user,
			};
		} else {
			return null;
		}
	} catch (e: any) {
		console.log("Unable to fetch user events", e);
		return null;
	}
};

export const getEventsByCategories = async ({
	category,
	page,
	limit,
}: {
	category: string;
	page: number;
	limit: number;
}) => {
	const url = `${EVENTS_API}${URLS.events.all}?page=${page}&limit=${limit}`;
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		const events: SingleEventProps[] = data.data.events;
		// console.log(data.data.events);

		const categorizedEvents = events.filter((e) =>
			e.categories.includes(category)
		);

		// console.log({
		// 	category,
		// 	categorizedEvents,
		// 	events: events.map((i) => i.categories),
		// });

		const presentEvents = categorizedEvents.filter((e) =>
			isBefore(today, new Date(e.endDate))
		);

		const publicEvents = presentEvents.filter((e) => e.isPublic);

		const sortedEvents = [...publicEvents].sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime()
		);

		const totalRecords = data.data.total;
		const currentPage = data.data.currentPage;
		const totalPages = data.data.totalPages;

		// console.log({ publicEvents });

		if (data.success === true) {
			return {
				event: sortedEvents,
				totalPages: totalPages,
				currentPage: currentPage,
				totalRecords: totalRecords,
			};
		}
		return null;
	} catch (e: any) {
		console.log("Unable to fetch events", e);
	}
};

export const getUserEVentsForCalendar = async ({
	limit,
	page,
}: PaginationType) => {
	const url = `${EVENTS_API}${URLS.events.all_events_user}?page=${page}&limit=${limit}`;
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
			next: { revalidate: 20 },
		});
		const data = await res.json();
		const events: SingleEventProps[] = data.data.all;
		// console.log({ data });

		if (res.ok) {
			return events.map((i) => ({
				image: i.image,
				title: i.title,
				cleanName: i.cleanName,
				startDate: i.startDate,
			}));
		}
	} catch (e: any) {
		console.log("Unable to fetch user events", e);
	}
};

export const getEventIdByCleanName = async (slug: string) => {
	const url = `${EVENTS_API}${URLS.events.one_slug.replace(
		"{cleanName}",
		slug
	)}`;
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
			next: { revalidate: 20 },
		});
		const data = await res.json();
		// console.log({ data });
		if (data.success) {
			// console.log(data.data);
			return {
				id: data.data.id,
			};
		} else return null;
	} catch (e: any) {
		console.log("Unable to fetch Event ID by slug", e);
	}
};

export const getTrendingEvents = async () => {
	//TODO: GET TRENDING EVENTS WHERE THERE ARE ATTENDEES
	const url = `${EVENTS_API}${URLS.events.all}`;
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
			next: { revalidate: 20 },
		});
		const data = await res.json();
		const events: SingleEventProps[] = data.data.events;
		// console.log(data.data.events);

		const sortedEvents = events.filter((e) => {
			// const start = new Date(e.startDate);
			// const end = new Date(e.endDate);

			return isBefore(today, e.endDate) || isSameDay(e.endDate, today);
		});

		const publicEvent = sortedEvents.filter((e) => e.isPublic === true);

		const slicedEvents = publicEvent.slice(0, 10);

		const totalRecords = data.data.total;
		const currentPage = data.data.currentPage;
		const totalPages = data.data.totalPages;

		if (data.success === true) {
			return {
				event: slicedEvents,
				totalPages: totalPages,
				currentPage: currentPage,
				totalRecords: totalRecords,
				// hasLimit: hasLimit ? slicedEvents : sortedEvents,
			};
		}
		return null;
	} catch (e: any) {
		console.log("Unable to fetch events", e);
	}
};

export const getMostRecentEvent = async ({ limit, page }: PaginationType) => {
	const url = `${EVENTS_API}${URLS.events.all}?page=${page}&limit=${limit}`;
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();
		const events: SingleEventProps[] = data.data.events;
		const today = new Date();

		const upcomingPublicEvents = events.filter(
			(e) => e.isPublic === true && isAfter(new Date(e.startDate), today)
		);

		// console.log({ upcomingPublicEvents });

		if (upcomingPublicEvents.length === 1) {
			return upcomingPublicEvents[0];
		}

		if (upcomingPublicEvents.length > 1) {
			const eventDates = upcomingPublicEvents.map(
				(e) => new Date(e.startDate)
			);
			const upcomingEventDate = closestTo(today, eventDates);

			return (
				upcomingPublicEvents.find(
					(e) =>
						new Date(e.startDate).getTime() ===
						upcomingEventDate?.getTime()
				) || null
			);
		}

		return null;
	} catch (error) {
		console.log("Unable to fetch event", error);
		return null;
	}
};

export const getAllUpcomingEvents = async ({ limit, page }: PaginationType) => {
	const url = `${EVENTS_API}${URLS.events.all}?page=${page}&limit=${limit}`;
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
			next: { revalidate: 20 },
		});

		const data = await res.json();
		const events: SingleEventProps[] = data.data.events;

		if (!data.success) return [];

		const today = new Date();

		const upcomingEvents = events.filter((ev) => {
			const evDate = new Date(ev.startDate);
			return ev.isPublic === true && isAfter(evDate, today);
		});

		const sortedUpcoming = upcomingEvents.sort((a, b) => {
			return (
				new Date(a.startDate).getTime() -
				new Date(b.startDate).getTime()
			);
		});

		return sortedUpcoming.slice(0, 5);
	} catch (error) {
		console.log("Unable to fetch events", error);
		return [];
	}
};

export const getEventsForCalendar = async ({ limit, page }: PaginationType) => {
	const url = `${EVENTS_API}${URLS.events.all}?page=${page}&limit=${limit}`;
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
			next: { revalidate: 20 },
		});
		const data = await res.json();
		const events: SingleEventProps[] = data.data.events;

		const futureEvent = events.filter((e) => isAfter(e.startDate, today));
		// console.log({ futureEvent });

		// console.log(data.data.events);
		// console.log({ recentEvent });

		// console.log(
		//   "Server Side  ",
		//   events.map((i) => ({
		//     image: i.image,
		//     cleanName: i.cleanName,
		//     startDate: i.startDate,
		//   }))
		// );
		if (data.success === true) {
			return futureEvent.map((i) => ({
				image: i.image,
				title: i.title,
				cleanName: i.cleanName,
				startDate: i.startDate,
			}));
		}
	} catch (e: any) {
		console.log(
			"Unable to fetch event image, clean name and start date",
			e
		);
	}
};

export const getEventsByCleanName = async (slug: string) => {
	const url = `${EVENTS_API}${URLS.events.one_slug.replace(
		"{cleanName}",
		slug
	)}`;
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
			// next: { revalidate: 20 },
		});
		const data = await res.json();
		// console.log({ data });
		if (data.success) {
			// console.log(data.data);
			return data.data;
		} else return null;
	} catch (e: any) {
		console.log("Unable to fetch Event information by slug", e);
	}
};

export const getEventWithTenAttendeesByCleanName = async (slug: string) => {
	const url = `${EVENTS_API}${URLS.events.all_events_with_attendee.replace(
		"{cleanName}",
		slug
	)}`;
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
			next: { revalidate: 20 },
		});
		const data = await res.json();
		// console.log({ data });
		const event = data.event;
		const attendees: MiniSingleAttendeeProps[] = data.attendees;
		const totalAttendees = data.totalAttendees;
		if (data.success) {
			// console.log(data.data);
			return {
				event: event,
				attendees: attendees,
				totalAttendees,
			};
		} else return null;
	} catch (e: any) {
		console.log("Unable to fetch Event information by slug", e);
	}
};

export const getEventsByID = async (id: string) => {
	const url = `${EVENTS_API}${URLS.events.one.replace("{id}", id)}`;
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
			// next: { revalidate: 20 },
		});
		const data = await res.json();
		// console.log({ data });
		if (data.success) {
			// console.log(data.data);
			return data.data;
		} else return null;
	} catch (e: any) {
		console.log("Unable to fetch Event information by slug", e);
	}
};

export const getEventsWithAttendeesByCleanName = async (slug: string) => {
	const url = `${EVENTS_API}${URLS.events.all_events_with_attendee.replace(
		"{cleanName}",
		slug
	)}`;
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
			next: { revalidate: 20 },
		});
		const data = await res.json();
		console.log({ data });
		if (data.success) {
			// console.log(data.data);
			return data.data;
		} else return null;
	} catch (e: any) {
		console.log("Unable to fetch Event information by slug", e);
	}
};

export const searchForEvents = async (value: string) => {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;
	const url = `${EVENTS_API}${URLS.events.event_search}?query=${value}`;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
			next: { revalidate: 20 },
		});
		const data = await res.json();
		const item: SingleEventProps[] = data.data.events.data;

		const showPublic = item.filter((e) => {
			return e.isPublic === true;
		});

		const filteredEvents = item.filter(
			(e) => isBefore(new Date(), e.endDate) && e.isPublic === true
		);

		// console.log({ showPublic });

		if (res.ok) {
			return { item: filteredEvents };
		}
		return null;
	} catch (e: any) {
		console.log("Unable to search for events", e);
	}
};

export const getNearbyEvents = async (
	lng: string,
	lat: string,
	radius: string
) => {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;
	const url = new URL(`${EVENTS_API}${URLS.events.nearby_events}`);
	url.searchParams.set("lng", lng);
	url.searchParams.set("lat", lat);
	radius && url.searchParams.set("radius", radius);

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
			next: { revalidate: 20 },
		});

		const data = await res.json();
		const events: SingleEventProps[] = data.data;
		const now = new Date();
		const filteredEvents = events.filter(
			(e) => isBefore(new Date(), e.endDate) && e.isPublic === true
		);

		if (res.ok) {
			return {
				events: filteredEvents,
			};
		}
		return null;
	} catch (e: any) {
		console.log("Unable to fetch nearby events", e);
		return null;
	}
};

export const closeRegistration = async (id: string) => {
	const url = `${EVENTS_API}${URLS.events.close_registration.replace(
		"{id}",
		id
	)}`;
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	try {
		const res = await fetch(url, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		if (res.ok) {
			return data.data;
		}
		return null;
	} catch (e: any) {
		console.log("Unable to close registration", e);
	}
};
