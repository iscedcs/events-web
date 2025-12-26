"use client";

import { DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { EllipsisVertical, MessageCircle, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentComponent from "./comment-component";
import { useState } from "react";

export default function FeedComponent({
	displayPicture,
	eventId,
}: {
	displayPicture: string;
	eventId: string;
}) {
	const [isLiked, setIsLiked] = useState(true);

	const handleFeedLike = () => {
		setIsLiked(!isLiked);
	};

	return (
		<div>
			<div className=" mt-[130px]">
				{/* <p className=" text-[25px]">Feed Posts</p> */}

				<div className=" mt-[10px]">
					<div className=" flex items-center justify-between flex-row">
						<div className=" gap-3 items-center flex">
							<Image
								src={
									displayPicture === ""
										? "/resources/no-profile.jpg"
										: displayPicture
								}
								alt="displayPicture"
								width={"1000"}
								height={"1000"}
								className=" w-[40px] rounded-full h-[40px] object-cover"
							/>
							<div className="">
								<p className=" font-extrabold">John Doe</p>
								<p className=" text-[12px] text-accent">
									johndoe@gmail.com
								</p>
							</div>
						</div>
						<div className="">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<EllipsisVertical />
								</DropdownMenuTrigger>
								<DropdownMenuContent className=" mr-[10px] border-0 bg-secondary rounded-[14px]">
									<div className=" px-[10px] py-[10px]">
										<span className=" py-[4px] flex items-center gap-5">
											<Trash className=" w-4 h-4 text-error" />
											<p className=" text-error">
												Delete
											</p>
										</span>
										<span className=" py-[4px] flex items-center gap-5">
											<Pencil className=" w-4 h-4 text-white" />
											<p className=" text-white">
												Edit post
											</p>
										</span>
									</div>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
					<div className=" mt-[10px]">
						<div className="">
							<p className=" text-[20px]">
								Today was fun, I met a lot of celebrities
								today!!!
							</p>
						</div>
						<div className=" mt-[10px]">
							<Image
								src={"/dummy-images/feed-example.jpg"}
								alt="post"
								height={"1000"}
								width={"1000"}
								className=" w-full rounded-[20px]"
							/>
							<div className=" flex flex-row gap-3 mt-[15px]">
								<span
									onClick={handleFeedLike}
									className=" flex items-center gap-2"
								>
									{isLiked ? (
										<FaRegHeart className=" w-[24px] h-[24px]" />
									) : (
										<FaHeart className=" w-[24px] h-[24px]" />
									)}
									<p>100</p>
								</span>
								<Drawer>
									<DrawerTrigger asChild>
										<span className=" flex items-center gap-2">
											<MessageCircle />
											<p>100</p>
										</span>
									</DrawerTrigger>
									<DrawerContent className=" pb-[20px] bg-secondary px-[10px]">
										<DialogTitle className=" text-center mt-[10px] font-bold">
											COMMENTS
										</DialogTitle>
										<CommentComponent
											displayPicture={displayPicture}
											feedId="343"
										/>
									</DrawerContent>
								</Drawer>
							</div>
							<div className=" mt-[15px]">
								<p className=" text-accent text-[12px]">
									Posted 20 minutes ago
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<hr className=" mt-[20px] border border-secondary" />
		</div>
	);
}
