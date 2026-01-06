import { Button } from "@/components/ui/button";
import { SingleCommentProps, SingleFeedPostProps } from "@/lib/types/feed";
import { SingleMomentPostProps } from "@/lib/types/moment";
import { UserProps } from "@/lib/types/user";
import Link from "next/link";
import { HiPlus } from "react-icons/hi";
import { getAuthInfo } from "../../../../../../actions/auth";
import { getAllCommentForFeed } from "../../../../../../actions/comments";
import { getAllFeedByEventId } from "../../../../../../actions/feeds";
import { getAllLikesForStoryOrFeed } from "../../../../../../actions/likes";
import {
	getAllMomentsForEventId,
	getPinnedMoments,
} from "../../../../../../actions/moment";
import { getUserByID } from "../../../../../../actions/user";
import FeedComponent from "./feeds/feed-component";
import MomentComponent from "./moments/moment-component";
import Image from "next/image";
import { CircleFadingPlus } from "lucide-react";
import GlobalMomentViewer from "./moments/global-moment-viewer";
import PinnedSection from "./pinned-section";
import { SingleEventProps } from "@/lib/types/event";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type SearchParams = { [key: string]: string | string[] | undefined };
export default async function HightLightsView({
	eventId,
	displayPicture,
	searchParams,
	event,
}: {
	event: SingleEventProps;
	eventId: string;
	displayPicture: string;
	searchParams: SearchParams;
}) {
	const { story } = searchParams;
	const session = await getAuthInfo();
	const user = session.user;

	const feedsDisplay: SingleFeedPostProps[] | null | undefined =
		await getAllFeedByEventId(eventId, {
			limit: 20,
			page: 1,
		});

	const momentsDisplay: Record<string, SingleMomentPostProps[]> | null =
		await getAllMomentsForEventId(eventId);

	const pinnedDisplay = await getPinnedMoments(eventId);

	const fullMomentDisplay = (
		await Promise.all(
			Object.entries(momentsDisplay ?? []).map(
				async ([userId, userMoments]) => {
					const user = await getUserByID(userId);

					return {
						user,
						moments: userMoments,
					};
				}
			)
		)
	).filter(
		(item): item is { user: UserProps; moments: SingleMomentPostProps[] } =>
			Boolean(item.user)
	);

	const fullPinnedMomentDisplay = await Promise.all(
		(pinnedDisplay ?? []).map(async (item) => {
			const user = await getUserByID(item.userId);
			const likeListDisplay = await getAllLikesForStoryOrFeed({
				itemId: item.id,
				likeType: "STORY",
				limit: 20,
				page: 1,
			});
			return {
				...item,
				user,
				likeListDisplay,
			};
		})
	);

	const fullFeedDisplay = await Promise.all(
		(feedsDisplay ?? []).map(async (item) => {
			const user = await getUserByID(item.userId);
			const commentListDisplay: SingleCommentProps[] | null | undefined =
				await getAllCommentForFeed({
					feedId: item.id,
					limit: 20,
					page: 1,
				});

			const likeListDisplay = await getAllLikesForStoryOrFeed({
				itemId: item.id,
				likeType: "FEED",
				limit: 20,
				page: 1,
			});

			const likesWithUsers = await Promise.all(
				(likeListDisplay ?? []).map(async (like) => {
					const likeUser = await getUserByID(like.userId);
					return { ...like, user: likeUser ?? undefined };
				})
			);

			const commentsWithUsers = await Promise.all(
				(commentListDisplay ?? []).map(async (comment) => {
					const commentUser = await getUserByID(comment.userId);
					return {
						...comment,
						user: commentUser ?? undefined,
					};
				})
			);
			return { ...item, user, likesWithUsers, commentsWithUsers };
		})
	);

	// console.log({ fullPinnedMomentDisplay });
	// console.log({ fullFeedDisplay });

	// console.log({ fullMomentDisplay });

	return (
		<div className=" relative ">
			<div className="relative">
				<div className=" px-[10px] fixed z-50 bg-black left-0 pb-[10px] py-[20px] mt-[55px] top-0 w-full flex flex-col ">
					<ScrollArea className=" w-full">
						<div className="flex w-max items-center flex-row gap-3">
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
								<p className=" text-[12px]">You</p>
							</Link>
							<div className="flex items-center flex-row gap-3">
								{fullMomentDisplay.map((item) => {
									return (
										<MomentComponent
											key={item.user?.id}
											sessionUserId={user?.id ?? ""}
											// eventId={eventId}
											moments={item.moments}
											firstName={item.user?.firstName!}
											lastName={item.user?.lastName!}
										/>
									);
								})}
								{/* <div className=" rounded-full w-[70px] h-[70px] bg-secondary"></div>
								<div className=" rounded-full w-[70px] h-[70px] bg-secondary"></div> */}
							</div>
							{searchParams.story && (
								<GlobalMomentViewer
									sessionUserId={user?.id ?? ""}
									allUserMoments={fullMomentDisplay}
									currentStoryId={
										Array.isArray(searchParams.story)
											? searchParams.story[0] ?? ""
											: searchParams.story ?? ""
									}
								/>
							)}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</div>

				{fullFeedDisplay.length === 0 ? (
					<div className=" flex flex-col items-center gap-3 mt-[300px]">
						<p className=" text-[25px] text-accent">
							Be the first to upload a feed
						</p>
						<Button asChild>
							<Link href={"highlights/feed/create"}>
								Make a post
							</Link>
						</Button>
					</div>
				) : (
					<div className=" mt-[110px]">
						{fullPinnedMomentDisplay.length > 0 && (
							<PinnedSection
								pinned={fullPinnedMomentDisplay}
								// likes={fullPinnedMomentDisplay}
								// user={fullPinnedMomentDisplay.}
								event={event}
							/>
						)}
						<div className=" ">
							{fullFeedDisplay?.map((item) => {
								return (
									<FeedComponent
										sessionUserId={user?.id ?? ""}
										key={item.id}
										feedProps={{
											...item,
										}}
										user={{
											...item.user!,
										}}
										likes={item.likesWithUsers}
										comments={item.commentsWithUsers}
									/>
								);
							})}
						</div>
					</div>
				)}
			</div>
			<Link href={"highlights/feed/create"}>
				<div className=" fixed flex items-center justify-center right-0 bottom-0 mb-[30px] rounded-full mr-[20px] bg-white w-[60px] h-[60px] ">
					<HiPlus className=" w-[30px] h-[30px] text-black" />
				</div>
			</Link>
		</div>
	);
}
