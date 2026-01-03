import { MediaType } from "./feed";

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
export type DurationType = "TWENTY_FOUR_HOURS" | "UNTIL_EVENT_END";
