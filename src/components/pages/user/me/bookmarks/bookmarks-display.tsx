"use client";
import { Button } from "@/components/ui/button";
import { SingleUserWatchlistProps } from "@/lib/types/watchlist";
import { Bookmark, CalendarDays } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SingleBookmarkCard from "./single-bookmark-card";
import { getWatchlistUserID } from "../../../../../../actions/watchlists";
import SingleEventCardSkeleton from "@/components/skeletons/single-event-card";

export default function BookmarksDisplay({ userId }: { userId: string }) {
	const [loading, setLoading] = useState(true);
	const [watchlist, setWatchlist] = useState<SingleUserWatchlistProps[]>([]);

	useEffect(() => {
		const fetchWatchList = async () => {
			setLoading(true);
			try {
				const data = await getWatchlistUserID(userId);
				if (data) {
					setLoading(false);
					setWatchlist(data);
				} else {
					setLoading(false);
				}
			} catch (e: any) {
				setLoading(false);
			} finally {
				setLoading(false);
			}
		};
		fetchWatchList();
	}, [userId]);

	return (
		<div>
			{loading ? (
				<SingleEventCardSkeleton />
			) : (
				<>
					{watchlist.length === 0 || watchlist === null ? (
						<div className=" mt-[50px] flex items-center justify-center flex-col text-accent gap-2">
							<Bookmark className=" w-[100px] h-[100px]" />
							<p>You have not bookmarked any event yet</p>
							<Button>
								<Link href={"/user/events?tab=discover"}>
									Discover events
								</Link>
							</Button>
						</div>
					) : (
						<div className=" flex pb-[20px] gap-3 flex-col">
							{watchlist.map((item) => {
								return (
									<SingleBookmarkCard
										location={item.event.location}
										key={item.id}
										cleanName={item.event.cleanName}
										image={item.event.image}
										startDate={item.event.startDate}
										time={item.event.time}
										title={item.event.title}
									/>
								);
							})}
						</div>
					)}
				</>
			)}
		</div>
	);
}
