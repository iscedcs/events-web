"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthInfo } from "@/hooks/use-auth-info";
import { useSwipe } from "@/hooks/useSwipe";
import { SingleEventProps } from "@/lib/types/event";
import { SingleMomentPostProps } from "@/lib/types/moment";
import { UserProps } from "@/lib/types/user";
import { formatDistance } from "date-fns";
import { ChartNoAxesColumn, StepBack, StepForward } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiMiniSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { ImSpinner2 } from "react-icons/im";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import { TbHistoryToggle } from "react-icons/tb";
import { TfiClose } from "react-icons/tfi";
import { toast } from "sonner";
import { getEventsByID } from "../../../../../../../actions/events";
import { getMomentById, pinToggle } from "../../../../../../../actions/moment";
import { getUserByID } from "../../../../../../../actions/user";
import { TiPin } from "react-icons/ti";
import { getAllLikesForStoryOrFeed } from "../../../../../../../actions/likes";
import { SingleLikesProps } from "@/lib/types/like";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function SingleMomentView({
	sessionUserId,
	momentId,
	moments,
}: {
	sessionUserId: string;
	momentId: string;
	moments: SingleMomentPostProps[];
}) {
	const [moment, setMoment] = useState<SingleMomentPostProps>();
	const [user, setUser] = useState<UserProps>();
	const [loading, setLoading] = useState(false);
	const [liked, setIsLiked] = useState(false);
	const [likeNumber, setLikeNumber] = useState(0);
	const [pinned, setIsPinned] = useState(false);
	const [event, setEvent] = useState<SingleEventProps>();
	const [muted, setMuted] = useState(true);
	const [likedList, setLikedList] = useState<SingleLikesProps[]>([]);

	const searchParams = useSearchParams();
	const currentMomentId = searchParams.get("story") ?? momentId;

	const fullName = `${user?.firstName} ${user?.lastName}`;
	const router = useRouter();
	const session = useAuthInfo();
	const userId = session.auth?.user.id;
	const videoRef = useRef<HTMLVideoElement>(null);
	const allMoments = moments;

	useEffect(() => {
		setLoading(true);
		const fetchMoment = async () => {
			try {
				const momentData = await getMomentById(currentMomentId);
				if (!momentData) return;

				const [userData, eventData, likesData] = await Promise.all([
					getUserByID(momentData.userId),
					getEventsByID(momentData.eventId),
					getAllLikesForStoryOrFeed({
						itemId: currentMomentId,
						likeType: "STORY",
						limit: 20,
						page: 1,
					}),
				]);

				setLikedList(Array.isArray(likesData) ? likesData : []);
				setMoment(momentData);
				setEvent(eventData);
				setUser(userData ?? undefined);
				setIsLiked(momentData?.isLikedByUser ?? false);
				setLikeNumber(momentData?.likesCount ?? 0);
				setIsPinned(momentData?.isPinned ?? false);
			} catch (err) {
				console.error("Error fetching moment:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchMoment();
	}, [currentMomentId]);

	const handleLikePost = async () => {
		const payload = {
			likeType: "STORY",
			momentId: currentMomentId,
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

	const handlePinStory = async () => {
		const pin = await pinToggle(momentId, pinned);
		if (pin) {
			if (pinned) {
				toast.success("This story has been unpinned");
				setIsPinned(false);
				router.refresh();
			} else {
				toast.success("This story has been pinned");
				setIsPinned(true);
				router.refresh();
			}
		} else {
			toast.error("Something went wrong");
			router.refresh();
		}
	};

	const toggleMute = () => {
		if (videoRef.current) {
			videoRef.current.muted = !muted;
			setMuted(!muted);
		}
	};

	const currentIndex = allMoments.findIndex(
		(s) => String(s.id) === String(currentMomentId)
	);

	const goNext = () => {
		if (currentIndex === -1) {
			console.warn("Current story not found in array", {
				currentMomentId,
				allMomentsIds: allMoments.map((s) => s.id),
			});
			return;
		}

		if (currentIndex >= allMoments.length - 1) {
			// Optional: close viewer or go to next user's stories
			// For now: just stop
			console.log("Reached last story of this user");
			router.push("./highlights");
			return;
		}

		const nextId = allMoments[currentIndex + 1].id;
		router.push(`?story=${nextId}`);
	};

	const goPrev = () => {
		if (currentIndex <= 0) {
			console.log("Already at first story");
			return;
		}
		const prevId = allMoments[currentIndex - 1].id;
		router.push(`?story=${prevId}`);
	};

	const { handleTouchStart, handleTouchEnd } = useSwipe(goNext, goPrev);

	useEffect(() => {
		if (!moment) return;

		const index = allMoments.findIndex((s) => s.id === momentId);
		const next = allMoments[index + 1];
		if (!next) return;

		if (next.mediaType === "IMAGE") {
			const img = new globalThis.Image();
			img.src = next.mediaUrl;
		} else if (next.mediaType === "VIDEO") {
			const video = document.createElement("video");
			video.src = next.mediaUrl;
			video.preload = "auto";
		}
	}, [momentId, allMoments, moment]);

	const getProgressDuration = () => {
		if (!moment) return "15s";
		return "15s";
	};

	// console.log({ likedList });

	return (
		<div className=" z-50 fixed left-0 top-0 w-full h-screen bg-black">
			{loading ? (
				<div className=" flex items-center justify-center h-screen">
					<ImSpinner2 className=" animate-spin w-[50px] h-[50px]" />
				</div>
			) : (
				<div
					onTouchStart={handleTouchStart}
					onTouchEnd={handleTouchEnd}
					className=" flex justify-between flex-col h-screen "
				>
					<div className="px-4 pt-1.5 flex gap-1.5">
						{allMoments.map((story, idx) => (
							<div
								key={story.id}
								className={`h-0.5 md:h-1 flex-1 rounded-full overflow-hidden ${
									idx < currentIndex ? "bg-white/10" : ""
								} ${
									idx === currentIndex
										? "bg-white"
										: "bg-white/30"
								}`}
							>
								{idx === currentIndex && (
									<div
										className="h-full animate-progress"
										style={{
											animationDuration:
												getProgressDuration(),
										}}
									/>
								)}
							</div>
						))}
					</div>
					<Link
						href={"./highlights"}
						className=" absolute right-0 top-0 pt-[17px] pr-[10px]"
					>
						<TfiClose className=" text-[25px]" />
					</Link>
					<div className="px-[10px] pt-[10px] flex flex-row gap-2">
						<div className="">
							{user?.displayPicture ? (
								<Image
									src={user?.displayPicture!}
									alt="displayPicture"
									width={"1000"}
									height={"1000"}
									className=" w-[50px] rounded-full  h-[50px] object-cover"
								/>
							) : (
								<Image
									src={"/resources/no-profile.jpg"}
									alt="displayPicture"
									width={"1000"}
									height={"1000"}
									className=" w-[50px] rounded-full  h-[50px] object-cover"
								/>
							)}
						</div>
						<div className="">
							<p className=" font-bold">{fullName}</p>
							{moment?.createdAt && (
								<p className=" text-accent text-[14px]">
									Posted{" "}
									{formatDistance(
										new Date(moment?.createdAt),
										new Date(),
										{
											includeSeconds: true,
											addSuffix: true,
										}
									)}
								</p>
							)}
						</div>
					</div>

					<div className="relative w-full h-full flex justify-center items-center">
						<div className="relative w-full h-full">
							{moment?.mediaType === "IMAGE" ? (
								<Image
									alt="moment"
									src={moment?.mediaUrl ?? "/fallback.jpg"}
									fill
									className="object-contain"
									priority
								/>
							) : (
								<div className="relative w-full h-full">
									<video
										key={moment?.id}
										ref={videoRef}
										src={moment?.mediaUrl}
										autoPlay
										playsInline
										muted={muted}
										loop
										className="w-full h-full object-contain"
									/>
									<Button
										variant="ghost"
										size="icon"
										onClick={toggleMute}
										className="absolute left-4 bottom-28 md:bottom-20 z-50 bg-black/40 hover:bg-black/60 rounded-full text-white"
									>
										{muted ? (
											<HiSpeakerXMark size={24} />
										) : (
											<HiMiniSpeakerWave size={24} />
										)}
									</Button>
								</div>
							)}
						</div>

						<button
							onClick={goPrev}
							aria-label="Previous story"
							className={`  absolute inset-y-0 left-0 w-1/3 md:w-2/5 z-30 touch-manipulation focus:outline-none`}
						/>

						<button
							onClick={goNext}
							aria-label="Next story"
							className={`  absolute inset-y-0 right-0 w-1/3 md:w-2/5 z-30 touch-manipulation focus:outline-none`}
						/>

						{/* Visible chevrons – only shown when needed (e.g. desktop or on tap) */}
						<div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 md:px-6 opacity-0 transition-opacity duration-200 group-hover:opacity-80">
							<div className="rounded-full bg-black/50 p-3">
								<StepBack size={28} className="text-white" />
							</div>
							<div className="rounded-full bg-black/50 p-3">
								<StepForward size={28} className="text-white" />
							</div>
						</div>
					</div>

					<div className=" z-50 items-end flex flex-col gap-7 absolute right-0 bottom-0 mr-[10px] mb-[180px] ">
						{sessionUserId === moment?.userId &&
							userId !== event?.userId && (
								<>
									{moment?.isPinned && (
										<div className=" flex flex-row items-center gap-2 bg-black/40 py-[10px] px-[15px] rounded-full">
											<TiPin className=" w-[20px] h-[20px]" />
											<p>Pinned by host</p>
										</div>
									)}
								</>
							)}
						<Dialog>
							<DialogTrigger asChild>
								<span>
									<TbHistoryToggle className=" w-[35px] h-[35px]" />
								</span>
							</DialogTrigger>
							<DialogContent className=" flex flex-col items-center bg-secondary border-0">
								<DialogTitle
									hidden
									className=" font-bold text-center"
								>
									Duration
								</DialogTitle>
								<TbHistoryToggle className=" w-[50px] h-[50px]" />
								{moment?.duration === "TWENTY_FOUR_HOURS" ? (
									<div>
										<p className=" font-bold text-[18px]">
											This story will last for 24 Hours
										</p>
										<p className=" text-center text-accent text-[13px]">
											Disappears in{" "}
											{formatDistance(
												new Date(moment?.expiresAt),
												new Date(),
												{
													includeSeconds: true,
													addSuffix: true,
												}
											)}
										</p>
									</div>
								) : (
									<div className="">
										<p className=" font-bold text-[18px]">
											This story will last until end of
											event
										</p>
										<p className=" text-center text-accent text-[13px]">
											Disappears in{" "}
											{formatDistance(
												new Date(
													moment?.expiresAt ??
														new Date()
												),
												new Date(),
												{
													includeSeconds: true,
													addSuffix: true,
												}
											)}
										</p>
									</div>
								)}
							</DialogContent>
						</Dialog>
						{userId === event?.userId && (
							<span>
								<div onClick={handlePinStory} className=" ">
									{pinned ? (
										<MdPushPin className=" w-[35px] h-[35px]" />
									) : (
										<MdOutlinePushPin className=" w-[35px] h-[35px]" />
									)}
								</div>
							</span>
						)}
						<span
							onClick={handleLikePost}
							className=" flex items-center flex-col gap-2"
						>
							{!liked ? (
								<FaRegHeart className=" w-[35px] h-[35px]" />
							) : (
								<FaHeart className=" w-[35px] h-[35px]" />
							)}
							<p>{likeNumber}</p>
						</span>
						{/* {sessionUserId === moment?.userId &&
							likedList.length > 0 && (
								<div className="">
									<Drawer>
										<DrawerTrigger asChild>
											<span className=" text-accent flex items-center gap-1">
												<ChartNoAxesColumn className=" w-[35px] h-[35px]" />
											</span>
										</DrawerTrigger>
										<DrawerContent className=" pb-[20px] bg-secondary px-[10px]">
											<DialogTitle
												hidden
												className=" text-center mt-[10px] font-bold"
											>
												analytics
											</DialogTitle>

											<div className=" mt-[10px] flex flex-col gap-3">
												{likedList.length > 0 ? (
													likedList.map((item) => {
														const fullName = `${
															item.user
																?.firstName ??
															""
														} ${
															item.user
																?.lastName ?? ""
														}`;

														return (
															<div
																key={item.id}
																className="flex flex-row justify-between items-center"
															>
																<div className="flex flex-row gap-2 items-center">
																	<Image
																		src={
																			item
																				.user
																				?.displayPicture
																				? item
																						.user
																						.displayPicture
																				: "/resources/no-profile.jpg"
																		}
																		alt="displayPicture"
																		width={
																			30
																		}
																		height={
																			30
																		}
																		className="w-[30px] h-[30px] rounded-full object-cover"
																	/>
																	<p>
																		{fullName ||
																			"Unknown user"}
																	</p>
																</div>
																<FaHeart />
															</div>
														);
													})
												) : (
													<p className="text-center text-accent">
														No likes yet
													</p>
												)}
											</div>
										</DrawerContent>
									</Drawer>
								</div>
							)} */}
					</div>

					<div className=" px-[10px] pb-[20px]">
						<p className=" text-center"> {moment?.caption}</p>
					</div>
				</div>
			)}
		</div>
	);
}
