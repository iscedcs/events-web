import { HiPlus } from "react-icons/hi";
import FeedComponent from "./feeds/feed-component";
import MomentComponent from "./moments/moment-component";
import Link from "next/link";
import { getAllFeedByEventId } from "../../../../../../actions/feeds";
import { getAuthInfo } from "../../../../../../actions/auth";
import { getUserByID } from "../../../../../../actions/user";
import { SingleCommentProps, SingleFeedPostProps } from "@/lib/types/feed";
import { getAllLikesForStoryOrFeed } from "../../../../../../actions/likes";
import { getAllCommentForFeed } from "../../../../../../actions/comments";
import { Button } from "@/components/ui/button";

export default async function HightLightsView({
	eventId,
	displayPicture,
}: {
	eventId: string;
	displayPicture: string;
}) {
	const session = await getAuthInfo();
	const user = session.user;

	const feedsDisplay: SingleFeedPostProps[] | null | undefined =
		await getAllFeedByEventId(eventId, {
			limit: 20,
			page: 1,
		});

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

	// console.log({ fullFeedDisplay });

	return (
		<div className=" ">
			<div className="relative">
				<MomentComponent
					displayPicture={displayPicture}
					eventId={eventId}
				/>

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
					<div className=" mt-[100px]">
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
