import { SingleAttendeeProps } from "./attendee";
import { SingleEventProps } from "./event";

export interface SingleTicketProps {
	id: string;
	title: string;
	eventId: string;
	quantity: number;
	available: boolean; //confirm this
	ticketStatus: string; //confirm this
	isFree: boolean;
	amount: number;
	currency: string;
	createdAt: Date;
	updatedAt: Date;
	event?: SingleEventProps;
	attendee?: SingleAttendeeProps[];
}

export type CreateTicketProps = Pick<
	SingleTicketProps,
	"amount" | "isFree" | "currency" | "title" | "quantity"
>;
export interface InitialTicketProps
	extends Pick<
		SingleTicketProps,
		"amount" | "isFree" | "currency" | "title" | "quantity"
	> {
	icon: React.ReactNode;
}
