import Header from "@/components/shared/layout/header";
import React from "react";
import { getUserByID } from "../../../../../../../../../actions/user";
import { getCurrentUser } from "../../../../../../../../../actions/auth";
import MomentCreateView from "@/components/pages/user/events/highlights/moments/moment-create";

export default async function MomentCreate() {
	const me = await getCurrentUser();

	const userId = me?.id ?? null;
	const headerUser = userId ? await getUserByID(userId) : null;
	return (
		<div>
			<Header hasBack title={`Post story`} user={headerUser} />
			<div className=" px-[10px] py-[70px] ">
				<MomentCreateView />
			</div>
		</div>
	);
}
