import HightLightsView from "@/components/pages/user/events/highlights/highlights-view";
import Header from "@/components/shared/layout/header";
import { SingleEventProps } from "@/lib/types/event";
import { getCurrentUser } from "../../../../../../../actions/auth";
import { getEventsByCleanName } from "../../../../../../../actions/events";
import { getUserByID } from "../../../../../../../actions/user";

type Params = Promise<{ slug: string }>;
export default async function Highlights(props: { params: Params }) {
	const me = await getCurrentUser();
	const params = await props.params;

	const formattedProps = encodeURIComponent(params.slug);
	const event: SingleEventProps = await getEventsByCleanName(
		formattedProps ?? ""
	);
	const userId = me?.id ?? null;
	const headerUser = userId ? await getUserByID(userId) : null;

	return (
		<div>
			<Header
				hasBack
				title={`Highlights: ${event?.title.toLowerCase()}`}
				user={headerUser}
			/>
			<div className=" relative px-[10px] py-[70px] ">
				<HightLightsView
					displayPicture={me?.displayPicture ?? ""}
					eventId={event.id}
				/>
			</div>
		</div>
	);
}
