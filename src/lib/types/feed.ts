import { UserProps } from "./user";

export interface SingleFeedPostValues {
	eventId: "string";
	content?: "string";
	mediaUrl: "string";
	mediaType: MediaType;
	caption: "string";
}

export interface SingleFeedPostProps
	extends Pick<
		SingleFeedPostValues,
		"caption" | "content" | "eventId" | "mediaType" | "mediaUrl"
	> {
	id: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
	likesCount: number;
	commentsCount: number;
	isLikedByUser: boolean;
	recentComments: SingleCommentProps[];
}

export interface SingleCommentProps {
	id: string;
	feedPostId: string;
	userId: string;
	content: String;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
	user?: UserProps;
}

export type MediaType = "IMAGE" | "VIDEO";
