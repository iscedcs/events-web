import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CircleFadingPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MomentComponent({
	displayPicture,
	eventId,
}: {
	displayPicture: string;
	eventId: string;
}) {
	return (
		<div>
			<div className="fixed bg-black pb-[10px] mt-[70px] top-0 w-full">
				<ScrollArea className=" w-[95%]">
					<div className=" w-[1000px] gap-4  flex flex-row">
						<Link
							href={"highlights/moment/create"}
							className=" justify-center items-center gap-2 flex flex-col "
						>
							<div className=" relative">
								<Image
									src={
										displayPicture === ""
											? "/resources/no-profile.jpg"
											: displayPicture
									}
									alt="displayPicture"
									width={"1000"}
									height={"1000"}
									className=" w-[70px] rounded-full border-white border-3 h-[70px] object-cover"
								/>
								<div className=" py-[5px] rounded-full px-[5px] absolute right-0 bottom-0 bg-white">
									<CircleFadingPlus className=" text-black" />
								</div>
							</div>
							<p>You</p>
						</Link>
						<div className="">
							<div className=" justify-center items-center gap-2 flex flex-col ">
								<div className=" relative">
									<Image
										src={
											displayPicture === ""
												? "/resources/no-profile.jpg"
												: displayPicture
										}
										alt="displayPicture"
										width={"1000"}
										height={"1000"}
										className=" w-[70px] rounded-full border-white border-3 h-[70px] object-cover"
									/>
								</div>
								<p>Angela</p>
							</div>
						</div>
						<div className="">
							<div className=" justify-center items-center gap-2 flex flex-col ">
								<div className=" relative">
									<Image
										src={"/resources/no-profile.jpg"}
										alt="displayPicture"
										width={"1000"}
										height={"1000"}
										className=" w-[70px] rounded-full border-white border-3 h-[70px] object-cover"
									/>
								</div>
								<p>Angela</p>
							</div>
						</div>
						<div className="">
							<div className=" justify-center items-center gap-2 flex flex-col ">
								<div className=" relative">
									<Image
										src={"/resources/no-profile.jpg"}
										alt="displayPicture"
										width={"1000"}
										height={"1000"}
										className=" w-[70px] rounded-full border-white border-3 h-[70px] object-cover"
									/>
								</div>
								<p>Angela</p>
							</div>
						</div>
						<div className="">
							<div className=" justify-center items-center gap-2 flex flex-col ">
								<div className=" relative">
									<Image
										src={"/resources/no-profile.jpg"}
										alt="displayPicture"
										width={"1000"}
										height={"1000"}
										className=" w-[70px] rounded-full border-white border-3 h-[70px] object-cover"
									/>
								</div>
								<p>Angela</p>
							</div>
						</div>
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
		</div>
	);
}
