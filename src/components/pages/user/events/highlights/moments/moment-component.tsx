"use client";

import { SingleMomentPostProps } from "@/lib/types/moment";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SingleMomentView from "./single-moment-view";

export default function MomentComponent({
	moments,
	firstName,
	lastName,
	sessionUserId,
}: {
	sessionUserId: string;
	lastName: string;
	firstName: string;
	moments: SingleMomentPostProps[];
}) {
	// console.log({ moment });
	const fullName = `${firstName} ${lastName}`;
	const firstStory = moments[0];
	const lastStory = moments[moments.length - 1];
	const searchParams = useSearchParams();
	const momentId = searchParams.get("story");

	// console.log({ momentId });

	// console.log({
	// 	firstStory: moments.indexOf(firstStory),
	// 	moments: moments.length,
	// 	items: moments,
	// 	lastStory: moments.indexOf(lastStory!),
	// });

	// console.log("MomentComponent render", {
	// 	momentsLength: moments.length,
	// 	momentsIds: moments.map((m) => m.id),
	// 	firstStoryId: moments[0]?.id ?? "no moments",
	// 	currentQueryParam: momentId ?? "none",
	// 	showingViewer: momentId !== null,
	// });

	// console.log("MomentComponent → moments info", {
	// 	user: `${firstName} ${lastName}`,
	// 	momentsCount: moments.length,
	// 	momentIds: moments.map((m) => m.id),
	// 	currentStoryFromUrl: momentId ?? "no story param",
	// });

	return (
		<div className=" ">
			<Link href={`?story=${firstStory.id}`}>
				<div className="">
					<div className=" justify-center items-center gap-2 flex flex-col ">
						<div className=" relative">
							{lastStory?.mediaType === "IMAGE" ? (
								<Image
									src={lastStory?.mediaUrl!}
									alt="post"
									width={"1000"}
									height={"1000"}
									className=" w-[70px] rounded-full border-white border-3 h-[70px] object-cover"
								/>
							) : (
								<video
									src={lastStory?.mediaUrl!}
									autoPlay
									playsInline
									// controls
									muted
									loop
									className=" w-[70px] rounded-full border-white border-3 h-[70px] object-cover"
								></video>
							)}
						</div>
						<p className=" font-extrabold text-[12px]">
							{firstName}
						</p>
					</div>
				</div>
			</Link>

			{momentId !== null && (
				<SingleMomentView
					sessionUserId={sessionUserId}
					moments={moments}
					momentId={momentId}
				/>
			)}
		</div>
	);
}
