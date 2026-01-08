import { SingleEventProps } from "@/lib/types/event";
import { combineDateAndTime } from "@/lib/utils";
import React from "react";

export default function googleCalendarUrl({
	event,
}: {
	event: SingleEventProps;
}) {
	const formatDate = (date: Date | string) => {
		const d = date instanceof Date ? date : new Date(date);
		return d.toISOString().replace(/[-:]|\.\d{3}/g, "");
	};

	const startDateTime = combineDateAndTime(event.startDate, event.time);

	const endDateTime = combineDateAndTime(event.endDate, event.endTime);

	const params = new URLSearchParams({
		action: "TEMPLATE",
		text: event.title,
		details: event.description,
		location: event.location,
		dates: `${formatDate(startDateTime)}/${formatDate(endDateTime)}`,
	});

	return `https://www.google.com/calendar/render?${params.toString()}`;
}
