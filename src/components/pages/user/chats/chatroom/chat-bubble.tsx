"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { SingleChatMessageProps, SingleMessageProps } from "@/lib/types/chat";
import { getRandomTextColor } from "@/lib/utils";
import { format } from "date-fns";
import {
	AlertCircle,
	Check,
	Clock,
	Dot,
	EllipsisVertical,
	MessageCircleReply,
	PencilLine,
	RotateCcw,
	Trash2,
	UserRound,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { GiQueenCrown } from "react-icons/gi";

export default function ChatBubble({
	isCurrentUser,
	message,
	onPrivateChat,
	onDeleteMessage,
	onEditMessage,
	isPrivate,
	onRetry,
	attendee,
}: SingleMessageProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [inputText, setInputText] = useState(message.message);
	const [drawerOpen, setDrawerOpen] = useState(false);

	// console.log({ attendee });

	const timestamp = message?.timestamp
		? format(new Date(message.timestamp), "p")
		: "";

	if (isCurrentUser) {
		return (
			<div className="flex flex-row-reverse items-start gap-2">
				{/* <Image
          alt="image"
          width={30}
          height={30}
          className="rounded-full w-[30px] h-[30px] object-cover"
          src={message.sender.displayPicture ?? "/resources/no-profile.jpg"}
        /> */}
				<div className="flex flex-col items-end">
					<div className="flex gap-3">
						{!isPrivate && (
							<p
								className={`capitalize text-[12px] ${getRandomTextColor(
									message.sender.name
								)}`}
							>
								You
							</p>
						)}
						<p className="text-accent text-[12px]">{timestamp}</p>
					</div>
					<div className=" flex flex-row-reverse gap-1 items-center ">
						<div className=" ">
							<div className="w-full text-[12px] break-words mt-[3px] rounded-tr-0 bg-secondary px-[25px] rounded-l-[20px] rounded-br-[20px] py-[12px]">
								{message.deletedAt !== null ? (
									<p className=" text-accent italic">
										This message has been deleted
									</p>
								) : (
									message.message
								)}
							</div>
						</div>
						{message.deletedAt === null && (
							<Drawer
								onOpenChange={setDrawerOpen}
								open={drawerOpen}
							>
								<DrawerTrigger>
									<EllipsisVertical className=" w-5 h-5 text-accent" />
								</DrawerTrigger>{" "}
								<DrawerContent className=" bg-secondary px-[20px] pb-[30px]">
									<DrawerTitle className=" font-black text-center">
										CHAT OPTIONS
									</DrawerTitle>
									<div className=" flex flex-col gap-4 mt-[20px]">
										<Dialog>
											<DialogTrigger
												onClick={() => {
													setIsEditing(true);
												}}
												asChild
											>
												<span className=" flex gap-2 items-center">
													<PencilLine className=" w-4 h-4" />{" "}
													<p>Edit message</p>
												</span>
											</DialogTrigger>
											<DialogContent className=" w-full bg-secondary border-0">
												<DialogTitle>
													Edit message
												</DialogTitle>
												<div className="px-[15px] relative w-full py-[10px] rounded-[20px] bg-[#151515]">
													<p className=" break-words break-all">
														{inputText}
													</p>
													<Input
														placeholder="Start typing...."
														type="text"
														value={inputText}
														onChange={(e) =>
															setInputText(
																e.target.value
															)
														}
														className=" mt-[10px] bg-[#151515] border-0 rounded-[8px]"
													/>
												</div>

												<DialogFooter className=" w-full flex flex-row gap-2">
													<DialogClose asChild>
														<Button
															onClick={() => {
																setIsEditing(
																	false
																);
																setDrawerOpen(
																	false
																);
															}}
															className=" w-[50%] rounded-[12px] font-semibold py-[24px]"
															variant="outline"
														>
															Cancel
														</Button>
													</DialogClose>
													<DialogClose asChild>
														<Button
															onClick={() => {
																onEditMessage(
																	message.id,
																	inputText
																);
																setIsEditing(
																	false
																);
																setDrawerOpen(
																	false
																);
															}}
															className=" w-[50%] rounded-[12px] font-semibold py-[24px]"
														>
															Save
														</Button>
													</DialogClose>
												</DialogFooter>
											</DialogContent>
										</Dialog>

										<Dialog>
											<DialogTrigger
												asChild
												onClick={() => {
													setIsDeleting(true);
												}}
											>
												<span className=" flex gap-2 items-center">
													<Trash2 className=" w-4 h-4" />
													<p>Delete message</p>
												</span>
											</DialogTrigger>
											<DialogContent className="w-full bg-secondary border-0">
												<DialogTitle>
													Delete message
												</DialogTitle>
												<p>
													Are you sure you want to
													delete this message?
												</p>
												<DialogFooter className=" flex flex-row gap-3">
													<DialogClose asChild>
														<Button
															onClick={() => {
																setDrawerOpen(
																	false
																);
																setIsDeleting(
																	false
																);
															}}
															variant={"outline"}
															className=" w-[50%] rounded-[12px] font-semibold py-[24px]"
														>
															Cancel
														</Button>
													</DialogClose>
													<DialogClose asChild>
														<Button
															onClick={() => {
																onDeleteMessage(
																	message.id
																);
																setDrawerOpen(
																	false
																);
																setIsDeleting(
																	false
																);
															}}
															className=" w-[50%] rounded-[12px] font-semibold py-[24px]"
														>
															Delete
														</Button>
													</DialogClose>
												</DialogFooter>
											</DialogContent>
										</Dialog>
									</div>
								</DrawerContent>
							</Drawer>
						)}
					</div>
					{message.deletedAt === null && (
						<div className=" items-center flex">
							<div>{renderMessageStatus(message)}</div>
							{message.updatedAt !== message.createdAt && (
								<>
									<Dot className=" text-zinc-400" />
									<p className=" mt-[3px] text-[12px] text-zinc-400">
										Edited
									</p>
								</>
							)}
						</div>
					)}
				</div>
			</div>
		);
	}

	// Other attendees
	return (
		<div className="flex items-start gap-2">
			{!isPrivate && (
				<Image
					alt="image"
					width={20}
					height={20}
					className="rounded-full w-[20px] h-[20px] object-cover"
					src={
						message.sender.displayPicture ??
						"/resources/no-profile.jpg"
					}
				/>
			)}
			<div className="">
				<div className=" items-center flex-row flex gap-2">
					{!isPrivate && (
						<p
							className={`capitalize text-[12px] ${getRandomTextColor(
								message.sender.name
							)}`}
						>
							{message.sender.name}
						</p>
					)}
					{/* {!isPrivate && (
            <>
              {message.isFromCreator && (
                <GiQueenCrown className=" w-3 h-3 text-[#F5BC0D]" />
              )}
            </>
          )} */}
					<p className="text-accent text-[12px]">{timestamp}</p>
				</div>
				<div className=" flex gap-1 items-center ">
					<div className="">
						<div className="w-full text-[12px] break-words mt-[3px] rounded-tl-0 bg-secondary px-[25px] rounded-r-[20px] rounded-bl-[20px] py-[12px]">
							{message.deletedAt !== null ? (
								<p className=" text-accent italic">
									This message has been deleted
								</p>
							) : (
								message.message
							)}
						</div>
					</div>
					<Drawer>
						<DrawerTrigger>
							<EllipsisVertical className=" w-5 h-5 text-accent" />
						</DrawerTrigger>{" "}
						<DrawerContent className=" bg-secondary px-[20px] pb-[30px]">
							<DrawerTitle className=" font-black text-center">
								CHAT OPTIONS
							</DrawerTitle>
							<div className=" flex flex-col gap-4 mt-[20px]">
								<span className=" flex gap-2 items-center">
									<UserRound className=" w-4 h-4" />{" "}
									<p>View profile</p>
								</span>
								{!isPrivate && (
									<>
										{message.isFromCreator ? (
											<span
												onClick={() => {
													onPrivateChat(
														"host",
														attendee?.id ?? ""
													);
												}}
												className=" flex gap-2 items-center"
											>
												<MessageCircleReply className=" w-4 h-4" />
												<p>Private chat event host</p>
											</span>
										) : (
											<span
												onClick={() => {
													onPrivateChat(
														"attendee",
														message.attendee_id ??
															""
													);
												}}
												className=" flex gap-2 items-center"
											>
												<MessageCircleReply className=" w-4 h-4" />
												<p>Private chat attendee</p>
											</span>
										)}
									</>
								)}
							</div>
						</DrawerContent>
					</Drawer>
				</div>
				{message.deletedAt === null && (
					<>
						{message.updatedAt !== message.createdAt && (
							<>
								<p className=" mt-[3px] text-[12px] text-zinc-400">
									Edited
								</p>
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
}

function renderMessageStatus(
	message: SingleChatMessageProps,
	onRetry?: (message: SingleChatMessageProps) => void
) {
	switch (message.status) {
		case "sending":
			return (
				<div className="flex items-center gap-1 text-zinc-400">
					<Clock className="h-3 w-3 animate-pulse" />
					<span className="text-xs">Sending...</span>
				</div>
			);
		case "sent":
			return (
				<div className="flex items-center gap-1 text-zinc-400">
					<Check className="h-3 w-3" />
					<span className="text-xs">Delivered</span>
				</div>
			);
		case "failed":
			return (
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-1 text-red-400">
						<AlertCircle className="h-3 w-3" />
						<span className="text-xs">Failed</span>
					</div>
					{onRetry && (
						<Button
							variant="ghost"
							size="sm"
							onClick={() => onRetry(message)}
							className="h-6 px-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20"
						>
							<RotateCcw className="h-3 w-3 mr-1" />
							Retry
						</Button>
					)}
				</div>
			);
		default:
			return <span className="text-xs text-zinc-400">Delivered</span>;
	}
}
