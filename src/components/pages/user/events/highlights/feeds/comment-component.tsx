import { DialogTitle } from "@/components/ui/dialog";
import { DrawerContent } from "@/components/ui/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { EllipsisVertical, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function CommentComponent({
	displayPicture,
	feedId,
}: {
	displayPicture: string;
	feedId: string;
}) {
	return (
		<div>
			<div className=" flex items-center justify-between mt-[10px]">
				<div className=" flex items-center gap-3">
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
						<span className=" flex items-center gap-3">
							<p className=" text-[14px] font-bold">John Doe</p>
							<p className=" text-[12px] text-accent">
								20 seconds ago
							</p>
						</span>
						<p className=" text-[12px]">
							Just another commenet my guyyy
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
									<p className=" text-error">Delete</p>
								</span>
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className=" mt-[20px]">
				<Input
					className=" bg-[#151515] px-[10px] border-0 rounded-[10px]"
					placeholder="Start typing..."
				/>
			</div>
		</div>
	);
}
