import { SingleEventProps } from "./event";

export interface SingleUserWatchlistProps {
	id: string;
	userId: string;
	eventId: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
	event: SingleEventProps;
}
