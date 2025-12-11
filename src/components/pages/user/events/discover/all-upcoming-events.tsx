"use client";

import { SingleEventProps } from "@/lib/types/event";
import { Snowflake } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
	getAllUpcomingEvents,
	getTrendingEvents,
} from "../../../../../../actions/events";
import { Button } from "@/components/ui/button";
import { AllTrendingEventSkeleton } from "@/components/skeletons/all-trending-events";
import TrendingEventCard from "./trending-event-card";

export default function AllUpcomingEvent() {
	const [event, setEvent] = useState<SingleEventProps[]>();
	const [loading, setIsLoading] = useState(true);

	const router = useRouter();

	useEffect(() => {
		setIsLoading(true);
		const fetchEvent = async () => {
			try {
				const event = await getAllUpcomingEvents({});
				if (event === null) {
					setIsLoading(false);
				} else {
					setEvent(event ?? []);
					setIsLoading(false);
				}
			} catch (e: any) {
				setIsLoading(false);
			}
		};
		fetchEvent();
	}, []);

	return (
		<>
			<div className=" ">
				{loading === true ? (
					<AllTrendingEventSkeleton />
				) : (
					<div>
						<>
							{event?.length === 0 || event === null ? (
								<div className=" h-[calc(100svh-55px)] flex-col flex items-center justify-center gap-3">
									<Snowflake className=" w-10 h-10" />
									<div className=" flex items-center justify-center flex-col">
										<p>No upcoming events yet</p>
										<p className=" text-accent">
											Check this space later for upcoming
											events
										</p>
									</div>
								</div>
							) : (
								<div className=" flex flex-col gap-3">
									{event?.map((event, k) => (
										<TrendingEventCard
											key={k}
											day={event?.startDate}
											image={`${event.image}`}
											location={event.location}
											path={event.cleanName.toLowerCase()}
											title={event.title}
										/>
									))}
								</div>
							)}
						</>
					</div>
				)}
			</div>
		</>
	);
}
