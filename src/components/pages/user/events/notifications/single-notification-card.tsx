"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SingleNotificationCardProps } from "@/lib/types/notifications";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdAlert } from "react-icons/io";
import { IoChatbubblesSharp, IoCheckmarkDoneOutline } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import { MdAccessTimeFilled, MdOutlineMoreVert } from "react-icons/md";
import { TbBellRinging2Filled } from "react-icons/tb";

export default function SingleNotificationCard({
	body,
	createdAt,
	id,
	read,
	title,
	type,
	data,
}: SingleNotificationCardProps) {
	const [isRead, setIsRead] = useState(read);

	const router = useRouter();

	const handleMarkAsRead = async () => {
		const payload = {
			notificationId: id,
		};
		const res = await fetch("/api/notifications/mark-read", {
			method: "PATCH",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		if (res.ok) {
			// window.location.reload();
			setIsRead(true);
			router.refresh();
			return data.success;
		} else return null;
	};

	const renderIcon = () => {
		switch (type) {
			case "CHAT_MESSAGE":
				return (
					<IoChatbubblesSharp
						className={` ${
							isRead ? " text-accent" : " text-white"
						} w-6 h-6`}
					/>
				);
			case "EVENT_REMINDER":
				return (
					<TbBellRinging2Filled
						className={`  ${
							isRead ? " text-accent" : " text-white"
						}  w-6 h-6`}
					/>
				);
			case "EVENT_STARTING":
				return (
					<MdAccessTimeFilled
						className={`  ${
							isRead ? " text-accent" : " text-white"
						}  w-6 h-6`}
					/>
				);
			default:
				return (
					<IoMdAlert
						className={`  ${
							isRead ? " text-accent" : " text-white"
						}  w-6 h-6`}
					/>
				);
		}
	};

	return (
		<div className="  w-full flex justify-between items-center">
			<div className="  flex items-start gap-3">
				<div className=" rounded-full flex items-center justify-center p-[15px] bg-secondary">
					{renderIcon()}
				</div>
				<div className=" flex flex-col w-full">
					<p
						className={`${
							isRead ? "text-accent" : "text-white"
						} text-[12px] line-clamp-1  font-bold`}
					>
						{title}
					</p>
					{/* <LuDot className=" text-accent" /> */}
					<p className=" w-[70%] mt-[4px]  text-[13px] text-accent font-light line-clamp-2">
						{body}
					</p>
				</div>
			</div>
			<div className="  flex flex-col items-end gap-2 ">
				<p className=" text-right text-accent text-[12px]">
					{formatDistanceToNow(new Date(createdAt), {
						includeSeconds: true,
					})}{" "}
					ago
				</p>
				{!isRead && (
					<div className="">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<MdOutlineMoreVert className="w-5 h-5" />
							</DropdownMenuTrigger>
							<DropdownMenuContent className=" px-[20px] py-[10px] bg-secondary mr-[10px] rounded-[12px] border-0">
								<div
									onClick={handleMarkAsRead}
									className=" flex items-center gap-4 "
								>
									<p className="text-[13px] text-white">
										Mark as read
									</p>
									<IoCheckmarkDoneOutline className=" text-white" />
								</div>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)}
			</div>
		</div>
	);
}
