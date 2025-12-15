"use client";

import { SingleEventProps } from "@/lib/types/event";
import React, { useEffect, useState } from "react";
import { getEventsByCategories } from "../../../../../../../actions/events";
import { AllTrendingEventSkeleton } from "@/components/skeletons/all-trending-events";
import { Snowflake } from "lucide-react";
import TrendingEventCard from "../trending-event-card";

export default function CategoryEvent({ category }: { category: string }) {
	const [event, setEvent] = useState<SingleEventProps[]>();
	const [loading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		const fetchEvent = async () => {
			try {
				const event = await getEventsByCategories({
					category: category,
					limit: 100,
					page: 1,
				});
				if (event === null) {
					setIsLoading(false);
				} else {
					setEvent(event?.event ?? []);
					setIsLoading(false);
				}
			} catch (e: any) {
				setIsLoading(false);
			}
		};
		fetchEvent();
	}, [category]);

	return (
		<div className=" bg-black left-0 w-full absolute px-[10px] z-40 h-full mt-[20px]">
			<>
				<div className=" ">
					{loading === true ? (
						<AllTrendingEventSkeleton />
					) : (
						<div>
							<>
								{event?.length === 0 || event === null ? (
									<div className=" mt-[50px] flex-col flex items-center justify-center gap-3">
										<Snowflake className=" w-10 h-10" />
										<div className=" flex items-center justify-center flex-col">
											<p>No event under this category</p>
											<p className=" text-center text-accent">
												This category is empty because
												the event might be over already
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
		</div>
	);
}
