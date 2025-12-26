import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Image, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function MomentCreateView() {
	return (
		<div>
			<Textarea
				placeholder="What's happening?"
				className="bg-[#151515] resize-none h-[300px] focus-visible:ring-0 border-0 outline-0 ring-0"
			/>
			<div className=" mt-[20px] flex justify-between items-center">
				<div className=" flex gap-3">
					<div className=" py-[15px] px-[15px] rounded-full bg-secondary">
						<Image className=" w-4 h-4" />
					</div>
					<div className="  py-[15px] px-[15px] rounded-full bg-secondary">
						<Video className=" w-4 h-4" />
					</div>
				</div>
				<div className="">
					<Select>
						<SelectTrigger className=" py-[23px] rounded-full bg-secondary border-0 px-[20px] w-[180px]">
							<SelectValue placeholder="Duration" />
						</SelectTrigger>
						<SelectContent className=" bg-secondary text-white border-0">
							<SelectItem value="apple">
								Till end of event
							</SelectItem>
							<SelectItem value="banana">24 hours</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className=" mt-[70px]">
				<Button className="  flex flex-row items-center w-full rounded-[12px] font-semibold py-[24px]">
					Post
				</Button>
			</div>
		</div>
	);
}
