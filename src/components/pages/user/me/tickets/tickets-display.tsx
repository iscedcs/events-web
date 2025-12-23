"use client";
import { Button } from "@/components/ui/button";
import { SingleTicketProps } from "@/lib/types/ticket";
import { CalendarDays, Ticket } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
	getFutureTicketsByUserId,
	getTicketsByUserID,
} from "../../../../../../actions/tickets";
import SingleEventCardSkeleton from "@/components/skeletons/single-event-card";
import SingleTicketCard from "./single-ticket-card";

export default function TicketsDisplay({ userId }: { userId: string }) {
	const [loading, setLoading] = useState(true);
	const [tickets, setTickets] = useState<SingleTicketProps[]>([]);

	useEffect(() => {
		const fetchEvent = async () => {
			setLoading(true);
			try {
				const data = await getFutureTicketsByUserId(userId, {});
				if (data) {
					setLoading(false);
					setTickets(data.filteredTickets as SingleTicketProps[]);
				} else {
					setLoading(false);
				}
			} catch (e: any) {
				setLoading(false);
			} finally {
				setLoading(false);
			}
		};

		fetchEvent();
	}, [userId]);

	return (
		<div>
			<div>
				{loading ? (
					<SingleEventCardSkeleton />
				) : (
					<>
						{tickets.length === 0 || tickets === null ? (
							<div className=" mt-[50px] flex items-center justify-center flex-col text-accent gap-2">
								<Ticket className=" w-[100px] h-[100px]" />
								<p>You do not have any tickets yet</p>
								<Button asChild>
									<Link href={"/user/events?tab=discover"}>
										Discover events
									</Link>
								</Button>
							</div>
						) : (
							<div className=" flex pb-[20px] gap-3 flex-col">
								{tickets.map((item) => {
									return (
										<SingleTicketCard
											ticketId={item.id}
											ticketTitle={item.title}
											isFree={item.isFree}
											location={
												item.event?.location ?? ""
											}
											key={item.id}
											cleanName={
												item.event?.cleanName ?? ""
											}
											image={item.event?.image ?? ""}
											startDate={
												item.event?.startDate ??
												new Date()
											}
											time={item.event?.time ?? ""}
											title={item.event?.title ?? ""}
										/>
									);
								})}
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
