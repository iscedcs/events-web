import Header from "@/components/shared/layout/header";
import React from "react";
import { getUserByID } from "../../../../../../../../../actions/user";
import { getCurrentUser } from "../../../../../../../../../actions/auth";
import MomentCreateView from "@/components/pages/user/events/highlights/moments/moment-create";
import { SingleEventProps } from "@/lib/types/event";
import { getEventsByCleanName } from "../../../../../../../../../actions/events";

type Params = Promise<{ slug: string }>;
export default async function MomentCreate(props: { params: Params }) {
	const params = await props.params;
	const me = await getCurrentUser();

	const userId = me?.id ?? null;
	const headerUser = userId ? await getUserByID(userId) : null;

	const formattedProps = encodeURIComponent(params.slug);
	const event: SingleEventProps = await getEventsByCleanName(
		formattedProps ?? ""
	);

	return (
		<div>
			<Header hasBack title={`Post story`} user={headerUser} />
			<div className=" px-[10px] py-[70px] ">
				<MomentCreateView eventId={event.id} />
			</div>
		</div>
	);
}
