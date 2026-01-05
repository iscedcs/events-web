"use client";

import UpcomingEventSkeleton from "@/components/skeletons/upcoming-event";
import { Button } from "@/components/ui/button";
import { SingleEventProps } from "@/lib/types/event";
import { formatWithCommasAndCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
	getAllUpcomingEvents,
	getMostRecentEvent,
} from "../../../../../../../actions/events";
import { useRouter } from "next/navigation";

export default function UpcomingEvent() {
	const [event, setEvent] = useState<SingleEventProps>();
	const [loading, setIsLoading] = useState(true);
	const [totalUpcoming, setTotalUpcoming] = useState(0);

	const router = useRouter();

	useEffect(() => {
		setIsLoading(true);
		const fetchEvent = async () => {
			const [event, totalUpcoming] = await Promise.all([
				getMostRecentEvent({}),
				getAllUpcomingEvents({}),
			]);

			try {
				if (
					event === undefined ||
					event === null ||
					totalUpcoming === null ||
					totalUpcoming === undefined
				) {
					setIsLoading(false);
				} else {
					setTotalUpcoming(totalUpcoming.length);
					setEvent(event);
					setIsLoading(false);
				}
			} catch (e: any) {
				setIsLoading(false);
			}
		};
		fetchEvent();
	}, []);
	// console.log({ event });
	// console.log("TICKETS", event?.tickets);
	// console.log("GALLARIES", event?.galleries);
	return (
		<>
			<div className=" mt-[40px]">
				<div className="flex items-center justify-between">
					<p className="text-[24px]">Upcoming Event</p>
					{totalUpcoming > 0 && (
						<Button
							onClick={() => {
								router.push("/user/events/upcoming");
							}}
						>
							View all
						</Button>
					)}
				</div>
			</div>
			<div>
				{loading === true ? (
					<UpcomingEventSkeleton />
				) : (
					<div className="">
						<div className=" mt-[10px] bg-secondary p-[20px] w-full rounded-[20px] ">
							{event === undefined || null ? (
								<div className=" flex items-center flex-col gap-3">
									<p>No upcoming event yet</p>
									<Button asChild>
										<Link href={"events?tab=create"}>
											Be the first to host an event
										</Link>
									</Button>
								</div>
							) : (
								<Link
									href={`/user/events/${event?.cleanName.toLowerCase()}`}
									className=""
								>
									<Image
										alt="image"
										src={
											event?.image?.startsWith("http") ||
											event?.image?.startsWith("/")
												? event?.image
												: "/resources/no-image.png"
										}
										width={"1000"}
										height={"1000"}
										className=" w-[90px] h-[90px]  object-cover rounded-[20px]"
									/>
									<div className=" text-[16px] mt-[10px]">
										<span className=" flex gap-2">
											<p>{event?.tickets[0].title}</p>{" "}
											<p> - </p>{" "}
											<p>
												{event?.tickets[0].isFree ===
												true
													? "FREE"
													: formatWithCommasAndCurrency(
															event?.tickets[0]
																.amount ?? 0
													  )}
											</p>
										</span>

										<p className=" capitalize text-accent">
											{event?.title.toLowerCase()}
										</p>
										<p className=" line-clamp-2 text-accent capitalize">
											{event?.location.toLowerCase()}
										</p>
									</div>
								</Link>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
}
