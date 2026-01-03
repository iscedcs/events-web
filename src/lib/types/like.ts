import { LikeType } from "./feed";
import { UserProps } from "./user";

export interface LikesValue {
	likeType: LikeType;
	momentId?: "string";
	feedPostId?: "string";
}

export interface SingleLikesProps extends LikesValue {
	id: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
	user?: UserProps;
}
