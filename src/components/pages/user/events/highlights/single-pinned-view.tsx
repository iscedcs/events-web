import { Button } from "@/components/ui/button";
import { SingleMomentPostProps } from "@/lib/types/moment";
import { UserProps } from "@/lib/types/user";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TiPin } from "react-icons/ti";

export default function SinglePinnedView({
	moment,
	user,
}: {
	moment: SingleMomentPostProps;
	user: UserProps;
}) {
	// const user = moment.user;
	return (
		<Link href={`?story=${moment.id}`} className=" relative">
			<div>
				{moment?.mediaType === "IMAGE" ? (
					<Image
						src={moment?.mediaUrl!}
						alt="post"
						width={"1000"}
						height={"1000"}
						className=" w-[150px] rounded-[15px]  h-[200px] object-cover"
					/>
				) : (
					<video
						src={moment?.mediaUrl!}
						autoPlay
						playsInline
						// controls
						muted
						loop
						className=" w-[150px] rounded-[15px] h-[200px] object-cover"
					></video>
				)}
			</div>
			<div className=" bg-gradient-to-b from-[#00000009]  to-[#000000c0] w-[150px] rounded-[15px] h-[200px] absolute top-0 left-0">
				<div className=" px-[9px] py-[4px] h-full flex justify-between items-end  flex-col">
					<div className="  px-[10px] py-[10px] rounded-full bg-black/20">
						<TiPin />
					</div>
					<div className="">
						<p className=" font-bold line-clamp-2">
							{moment.caption}
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
}
