import { SingleEventProps } from "@/lib/types/event";

export function generateICS({ event }: { event: SingleEventProps }) {
	const formatDate = (date: Date | string) => {
		const d = date instanceof Date ? date : new Date(date);
		return d.toISOString().replace(/[-:]|\.\d{3}/g, "");
	};

	return `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YourApp//EN
BEGIN:VEVENT
UID:${Date.now()}@yourapp.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(event.startDate)}
DTEND:${formatDate(event.endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
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
