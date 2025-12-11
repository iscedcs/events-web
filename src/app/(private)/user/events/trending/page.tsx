import Header from "@/components/shared/layout/header";
import { getCurrentUser } from "../../../../../../actions/auth";
import { getUserByID } from "../../../../../../actions/user";
import { AllTrendingEventSkeleton } from "@/components/skeletons/all-trending-events";
import AllTrendingEventView from "@/components/pages/user/events/discover/all-trending-events";

export default async function AllEvents() {
	const me = await getCurrentUser();
	const user = me ? await getUserByID(me.id!) : null;



	return (
		<div>
			<Header hasBack title="Trending Events" user={user} />
			<div className=" px-[10px] pt-[70px]">
				<div className="">
					<AllTrendingEventView />
				</div>
			</div>
		</div>
	);
}
