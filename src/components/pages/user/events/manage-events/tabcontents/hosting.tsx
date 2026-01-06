import EventCard from "@/components/shared/event/event-card";
import EventCardSkeleton from "@/components/skeletons/event-card";
import EventCalendar from "@/components/ui/secondary/event-calendar";
import { SingleEventProps } from "@/lib/types/event";
import { useEffect, useState } from "react";
import { getUserEVents } from "../../../../../../../actions/events";
import EmptyState from "../empty-state";

export default function Hosting() {
	const [events, setEvents] = useState<SingleEventProps[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// if (!userId) return;

		let cancelled = false;

		const fetchEvents = async () => {
			setLoading(true);
			try {
				const eventsData = await getUserEVents({});
				if (!cancelled) setEvents(eventsData?.events ?? []);
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		fetchEvents();

		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<>
			<div className=" px-[10px] absolute top-0 right-0">
				<EventCalendar eventType="hosting" type="multiple" />
			</div>

			{loading && (
				<div className=" mt-[20px]">
					<EventCardSkeleton />
				</div>
			)}

			{!loading && events.length === 0 && <EmptyState />}

			{!loading && events.length > 0 && (
				<div className=" grid-cols-1 grid gap-[30px] mt-[20px] ">
					{events.map((event) => (
						<div key={event.id}>
							<EventCard
								title={event?.title ?? ""}
								image={event?.image ?? ""}
								time={event?.time ?? ""}
								host={event?.host ?? ""}
								endDate={event.endDate ?? ""}
								startDate={event?.startDate ?? new Date()}
								id={event.id}
								link={`/user/events/${event?.cleanName.toLowerCase()}`}
								cardType="hosting"
							/>
							<hr className=" text-accent mt-[25px]" />
						</div>
					))}
				</div>
			)}
		</>
	);
}
