import UpdateDisplay from "@/components/shared/layout/update-display";
import React from "react";
import { getCurrentUser } from "../../../../../../actions/auth";
import { getUserByID } from "../../../../../../actions/user";
import Header from "@/components/shared/layout/header";
import TicketsDisplay from "@/components/pages/user/me/tickets/tickets-display";

export default async function MyTickets() {
	const me = await getCurrentUser();
	const user = await getUserByID(me?.id ?? "");
	return (
		<div>
			<Header hasBack title={"My Tickets"} user={user} />
			<div className=" px-[10px] pt-[70px]">
				<TicketsDisplay userId={me?.id!} />
			</div>
		</div>
	);
}
