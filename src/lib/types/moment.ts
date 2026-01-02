import { DurationType, MediaType } from "@prisma/client";
import { UserProps } from "./user";

export interface SingleMomentPostValues {
	eventId: "string";
	content?: "string";
	mediaUrl: "string";
	mediaType: MediaType;
	caption: "string";
	duration: DurationType;
}

export interface SingleMomentPostProps
	extends Pick<
		SingleMomentPostValues,
		| "caption"
		| "content"
		| "duration"
		| "eventId"
		| "mediaType"
		| "mediaUrl"
	> {
	id: string;
	userId: string;
	expiresAt: Date;
	isPinned: boolean;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
	likesCount: number;
	isLikedByUser: boolean;
}
