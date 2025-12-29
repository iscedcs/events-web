import { EVENTS_API, URLS } from "@/lib/const";
import { getAuthInfo } from "./auth";
import { SingleCommentProps } from "@/lib/types/feed";

export const getAllCommentForFeed = async ({
	feedId,
	limit,
	page,
}: {
	feedId: string;
	page: number;
	limit: number;
}) => {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;
	const url = new URL(
		`${EVENTS_API}${URLS.feeds.get_comment_for_feed.replace(
			"{id}",
			feedId
		)}`
	);

	page && url.searchParams.set("page", page.toString());
	limit && url.searchParams.set("limit", limit.toString());

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${BEARER}`,
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		const comments: SingleCommentProps[] = data;

		// console.log({ data });

		if (res.ok) {
			return comments;
		} else {
			return null;
		}
	} catch (e: any) {
		console.log("Unable to fetch feed comments", e);
	}
};

export const deleteComment = async (commentId: string) => {
	const auth = await getAuthInfo();
	const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

	const url = `${EVENTS_API}${URLS.feeds.delete_comment.replace(
		"{id}",
		commentId
	)}`;
	try {
		const res = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${BEARER}`,
			},
		});
		const data = await res.json();

		console.log({ res, url });

		if (res.ok) {
			return data;
		} else {
			return null;
		}
	} catch (e: any) {
		console.log("Unable to delete comment", e);
	}
};
