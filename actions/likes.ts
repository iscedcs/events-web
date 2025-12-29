import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "./auth";
import { SingleLikesProps } from "@/lib/types/like";

export const getAllLikesForStoryOrFeed = async ({
	likeType,
	itemId,
	page,
	limit,
}: {
	likeType: "FEED" | "STORY";
	itemId: string;
	page: number;
	limit: number;
}) => {
	const url = new URL(
		`${EVENTS_API}${URLS.likes.all_likes_feed_or_moment
			.replace("{likeType}", likeType)
			.replace("{itemId}", itemId)}`
	);
	page && url.searchParams.set("page", page.toString());
	limit && url.searchParams.set("limit", limit.toString());

	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		const likes: SingleLikesProps[] = data;

		// console.log({ likes, url });

		if (res.ok) {
			return likes;
		}
		return null;
	} catch (e: any) {
		console.log("Unable to get likes list", e);
	}
};
