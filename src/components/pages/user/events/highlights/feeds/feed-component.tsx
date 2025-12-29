"use client";

import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SingleCommentProps, SingleFeedPostProps } from "@/lib/types/feed";
import { SingleLikesProps } from "@/lib/types/like";
import { UserProps } from "@/lib/types/user";
import { formatDistance } from "date-fns";
import {
	ChartNoAxesColumn,
	EllipsisVertical,
	LoaderCircle,
	MessageCircle,
	Pencil,
	Trash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentComponent from "./comment-component";
import { deleteFeed } from "../../../../../../../actions/feeds";
import { toast } from "sonner";

export default function FeedComponent({
	feedProps,
	user,
	sessionUserId,
	likes,
	comments,
}: {
	sessionUserId: string;
	feedProps: SingleFeedPostProps;
	user: UserProps;
	likes: SingleLikesProps[];
	comments: SingleCommentProps[];
}) {
	const [isLiked, setIsLiked] = useState(feedProps.isLikedByUser);
	const [likeNumber, setLikeNumber] = useState(feedProps.likesCount);
	const [commentNumber, setCommentNumber] = useState(feedProps.commentsCount);
	const [commentText, setCommentText] = useState("");
	const [loading, setLoading] = useState(false);

	const videoRef = useRef<HTMLVideoElement>(null);
	const router = useRouter();
	const fullName = `${user.firstName} ${user.lastName}`;
	const feedAnalytics = likeNumber + commentNumber;

	// console.log(likes)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						videoRef.current?.play();
					} else {
						videoRef.current?.pause();
					}
				});
			},
			{ threshold: 0.5 }
		);

		if (videoRef.current) observer.observe(videoRef.current);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const likeNumberCheck = () => {
			setLikeNumber(feedProps.likesCount);
		};
		likeNumberCheck();
	}, [feedProps.likesCount]);

	useEffect(() => {
		const likeCheck = () => {
			if (feedProps.isLikedByUser) {
				setIsLiked(true);
			}
		};
		likeCheck();
	}, [feedProps.isLikedByUser]);

	const handleLikePost = async () => {
		const payload = {
			likeType: "FEED",
			feedPostId: feedProps.id,
		};
		try {
			const res = await fetch("/api/like/toggle", {
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
				method: "POST",
			});
			const data = await res.json();
			if (res.ok) {
				setIsLiked(data.isLikedByUser);
				setLikeNumber(data.count);
				router.refresh();
			}
		} catch (e: any) {
			console.log("Unable to like feed post", e);
		}
	};

	const handlePostComment = async () => {
		setLoading(true);
		const payload = {
			content: commentText,
			id: feedProps.id,
		};

		try {
			const res = await fetch("/api/feed/comment/new", {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify(payload),
			});
			// const data = await res.json();
			if (res.ok) {
				setLoading(false);
				setCommentText("");
				setCommentNumber(feedProps.commentsCount + 1);
				router.refresh();
			}
		} catch (e: any) {
			console.log("Unable to comment on feed post", e);
		}
	};

	// console.log({ id: feedProps.id });

	const handleDeletePost = async () => {
		try {
			const res = await deleteFeed(feedProps.id);
			if (res) {
				router.refresh();
			} else {
				router.refresh();
				toast.error("Something went wrong with deleting post");
			}
		} catch (e: any) {
			console.log("Unable to delete feed post", e);
		}
	};

	return (
		<div>
			<div className=" pt-[20px] ">
				{/* <p className=" text-[25px]">Feed Posts</p> */}

				<div className=" mt-[10px]">
					<div className=" flex items-center justify-between flex-row">
						<div className=" gap-3 items-center flex">
							<Image
								src={
									user.displayPicture === ""
										? "/resources/no-profile.jpg"
										: user.displayPicture
								}
								alt="displayPicture"
								width={"1000"}
								height={"1000"}
								className=" w-[40px] rounded-full h-[40px] object-cover"
							/>
							<div className="">
								<p className=" font-extrabold">{fullName}</p>
								<p className=" text-[12px] text-accent">
									{user.email}
								</p>
							</div>
						</div>
						{sessionUserId === feedProps.userId && (
							<div className="">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<EllipsisVertical />
									</DropdownMenuTrigger>
									<DropdownMenuContent className=" mr-[10px] border-0 bg-secondary rounded-[14px]">
										<div className=" px-[10px] py-[10px]">
											<span
												onClick={handleDeletePost}
												className=" py-[4px] flex items-center gap-5"
											>
												<Trash className=" w-4 h-4 text-error" />
												<p className=" text-error">
													Delete
												</p>
											</span>
											<Link
												href={`highlights/feed/edit/${feedProps.id}`}
											>
												<span className=" py-[4px] flex items-center gap-5">
													<Pencil className=" w-4 h-4 text-white" />
													<p className=" text-white">
														Edit post
													</p>
												</span>
											</Link>
										</div>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						)}
					</div>
					<div className=" mt-[10px]">
						<div className="">
							<p className=" text-[20px]">{feedProps.caption}</p>
						</div>
						<div className=" mt-[10px]">
							{feedProps.mediaType === "IMAGE" ? (
								<Image
									src={feedProps.mediaUrl}
									alt="post"
									height={"1000"}
									width={"1000"}
									className=" w-full rounded-[20px]"
								/>
							) : (
								<video
									src={feedProps.mediaUrl}
									autoPlay
									playsInline
									controls
									controlsList="nofullscreen"
									ref={videoRef}
									muted
									loop
									className=" rounded-[20px]"
								></video>
							)}
							<div className=" mt-[15px] flex flex-row justify-between">
								<div className=" flex flex-row gap-3">
									<span
										onClick={handleLikePost}
										className=" flex items-center gap-2"
									>
										{!isLiked ? (
											<FaRegHeart className=" w-[24px] h-[24px]" />
										) : (
											<FaHeart className=" w-[24px] h-[24px]" />
										)}
										<p>{likeNumber}</p>
									</span>
									<Drawer>
										<DrawerTrigger asChild>
											<span className=" flex items-center gap-2">
												<MessageCircle />
												<p>{commentNumber}</p>
											</span>
										</DrawerTrigger>
										<DrawerContent className=" pb-[10px] bg-secondary px-[10px]">
											<DialogTitle className=" text-center mt-[10px] font-bold">
												COMMENTS
											</DialogTitle>
											<ScrollArea
												className={`${
													comments.length >= 6
														? " h-[200px]"
														: " h-full "
												}`}
											>
												{comments.length === 0 ? (
													<div className=" flex flex-col justify-center items-center mt-[20px]">
														<MessageCircle
															strokeWidth={1}
															className=" w-[60px] text-accent h-[60px]"
														/>
														<p className=" text-[13px] text-accent">
															No comments yet
														</p>
													</div>
												) : (
													<div className="">
														{comments.map(
															(item) => (
																<CommentComponent
																	sessionUserId={
																		sessionUserId
																	}
																	key={
																		item.id
																	}
																	comment={{
																		...item,
																	}}
																/>
															)
														)}
													</div>
												)}
											</ScrollArea>
											<div className=" flex items-center gap-3 mt-[20px]">
												<Input
													value={commentText}
													onChange={(e) =>
														setCommentText(
															e.target.value
														)
													}
													className=" bg-[#151515] text-[12px] px-[10px] border-0 rounded-[10px]"
													placeholder="Start typing..."
												/>
												<Button
													onClick={handlePostComment}
													disabled={
														loading ||
														commentText === ""
													}
													className="text-[12px]"
												>
													{loading ? (
														<LoaderCircle className=" animate-spin" />
													) : (
														<p>Reply</p>
													)}
												</Button>
											</div>
										</DrawerContent>
									</Drawer>
								</div>
								{feedAnalytics > 0 && (
									<div className="">
										<Drawer>
											<DrawerTrigger asChild>
												<span className=" text-accent flex items-center gap-1">
													<ChartNoAxesColumn />
													<p>{feedAnalytics}</p>
												</span>
											</DrawerTrigger>
											<DrawerContent className=" pb-[20px] bg-secondary px-[10px]">
												<DialogTitle
													hidden
													className=" text-center mt-[10px] font-bold"
												>
													analytics
												</DialogTitle>
												<div className=" mt-[15px]">
													<div className=" flex justify-center items-center gap-5">
														<div className=" flex flex-row gap-1 items-center">
															<FaRegHeart className=" w-[24px] h-[24px]" />
															<p>{likeNumber}</p>
														</div>
														<div className=" flex flex-row gap-1 items-center">
															<MessageCircle className=" w-[24px] h-[24px]" />
															<p>
																{commentNumber}
															</p>
														</div>
													</div>
												</div>
												<div className=" mt-[10px] flex flex-col gap-3">
													{likes.map((item) => {
														const fullName = `${item.user?.firstName} ${item.user?.lastName}`;
														return (
															<div
																key={item.id}
																className=" flex flex-row justify-between items-center"
															>
																<div className=" flex flex-row gap-2 items-center">
																	<Image
																		src={
																			item
																				.user
																				?.displayPicture! ===
																			""
																				? "/resources/no-profile.jpg"
																				: item
																						.user
																						?.displayPicture!
																		}
																		alt="displayPicture"
																		width={
																			"1000"
																		}
																		height={
																			"1000"
																		}
																		className=" w-[30px] rounded-full h-[30px] object-cover"
																	/>
																	<p>
																		{
																			fullName
																		}
																	</p>
																</div>
																<FaHeart />
															</div>
														);
													})}
												</div>
											</DrawerContent>
										</Drawer>
									</div>
								)}
							</div>
							<div className=" mt-[15px]">
								<p className=" text-accent text-[12px]">
									Posted{" "}
									{formatDistance(
										new Date(),
										feedProps.createdAt,
										{ includeSeconds: true }
									)}{" "}
									ago
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
