import Header from "@/components/shared/layout/header";
import React from "react";
import { getCurrentUser } from "../../../../../../actions/auth";
import { getUserByID } from "../../../../../../actions/user";
import AllUpcomingEvent from "@/components/pages/user/events/discover/all-upcoming-events";

export default async function Upcoming() {
	const me = await getCurrentUser();
	const user = me ? await getUserByID(me.id!) : null;
	return (
		<div>
			<Header hasBack title="Upcoming Events" user={user} />
			<div className=" px-[10px] pt-[70px]">
				<AllUpcomingEvent />
			</div>
		</div>
	);
}
