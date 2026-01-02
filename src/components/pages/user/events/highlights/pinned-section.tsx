import { SingleMomentPostProps } from "@/lib/types/moment";
import React from "react";
import SinglePinnedView from "./single-pinned-view";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UserProps } from "@/lib/types/user";
import { SingleEventProps } from "@/lib/types/event";
import { getAuthInfo } from "../../../../../../actions/auth";
import { SingleLikesProps } from "@/lib/types/like";

export default async function PinnedSection({
	pinned,
	event,
}: {
	pinned: any[];
	event: SingleEventProps;
}) {
	const session = await getAuthInfo();
	const userId = session.user?.id;
	// console.log({ pinned });
	return (
		<div className=" mt-[10px]">
			{event.userId === userId ? (
				<p>Pinned by You</p>
			) : (
				<p>Pinned by Host</p>
			)}
			<ScrollArea className="w-full">
				<div className=" w-[1000px]  flex flex-row gap-4 mt-[10px]">
					{pinned.map((story) => {
						return (
							<SinglePinnedView
								key={story.id}
								moment={{ ...story }}
								user={{ ...story.user }}
							/>
						);
					})}
					<ScrollBar orientation="horizontal" />
				</div>
			</ScrollArea>
		</div>
	);
}
