import { SingleEventProps } from "@/lib/types/event";
import { combineDateAndTime } from "@/lib/utils";

export function generateICS({ event }: { event: SingleEventProps }) {
	const formatDate = (date: Date) =>
		date.toISOString().replace(/[-:]|\.\d{3}/g, "");

	const startDateTime = combineDateAndTime(event.startDate, event.time);

	let endDateTime = combineDateAndTime(event.endDate, event.endTime);

	if (endDateTime <= startDateTime) {
		endDateTime.setDate(endDateTime.getDate() + 1);
	}

	return `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YourApp//EN
BEGIN:VEVENT
UID:${Date.now()}@yourapp.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDateTime)}
DTEND:${formatDate(endDateTime)}
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/<[^>]+>/g, "")}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR
`.trim();
}
export const downloadICS = ({ event }: { event: SingleEventProps }) => {
	const icsContent = generateICS({ event });
	const blob = new Blob([icsContent], { type: "text/calendar" });
	const url = URL.createObjectURL(blob);

	const link = document.createElement("a");
	link.href = url;
	link.download = `${event.title}.ics`;
	document.body.appendChild(link);
	link.click();

	document.body.removeChild(link);
	URL.revokeObjectURL(url);
};
