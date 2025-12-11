import TicketView from "@/components/pages/user/events/single-event/ticket/ticket-view";
import Header from "@/components/shared/layout/header";
import { SingleAttendeeProps } from "@/lib/types/event";
import { SingleTicketProps } from "@/lib/types/ticket";
import {
  getAttendeeID,
  getAttendeesEventID,
} from "../../../../../../../../actions/attendee";
import { getCurrentUser } from "../../../../../../../../actions/auth";
import { getTicketByID } from "../../../../../../../../actions/tickets";
import { getUserByID } from "../../../../../../../../actions/user";

type Params = Promise<{ id: string }>;

export default async function Ticket(props: { params: Params }) {
	const params = await props.params;

	const me = await getCurrentUser();

	const user = me ? await getUserByID(me.id!) : null;
	const ticket: SingleTicketProps = await getTicketByID(params.id);
	const attendees: SingleAttendeeProps[] = await getAttendeesEventID(
		ticket.event?.id ?? ""
	);

	const singleAttendeeID =
		attendees.find((attendee) => attendee.userId === me?.id)?.id ?? "";

	const attendee: SingleAttendeeProps = await getAttendeeID(singleAttendeeID);

	// console.log({ singleAttendeeID });


	// const ticketRef = useRef<HTMLDivElement>(null);

	// console.log({ startDate, endDate, now });

	// console.log(isEqual(now, startDate));


	return (
		<div>
			<Header
				hasBack
				title={`Ticket: ${ticket.event?.title}`}
				user={user}
			/>
			<TicketView attendee={attendee} ticket={ticket} />
		</div>
	);
}
