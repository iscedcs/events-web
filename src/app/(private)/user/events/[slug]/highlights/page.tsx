import HightLightsView from "@/components/pages/user/events/highlights/highlights-view";
import Header from "@/components/shared/layout/header";
import { SingleEventProps } from "@/lib/types/event";
import { getCurrentUser } from "../../../../../../../actions/auth";
import { getEventsByCleanName } from "../../../../../../../actions/events";
import { getUserByID } from "../../../../../../../actions/user";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export default async function Highlights(props: {
	params: Params;
	searchParams: SearchParams;
}) {
	const me = await getCurrentUser();
	const searchParams = await props.searchParams;
	const params = await props.params;
	const story = searchParams.story;

	const formattedProps = encodeURIComponent(params.slug);
	const event: SingleEventProps = await getEventsByCleanName(
		formattedProps ?? ""
	);
	const userId = me?.id ?? null;
	const headerUser = userId ? await getUserByID(userId) : null;

	return (
		<div className=" relative">
			<Header
				hasBack
				title={`Highlights: ${event?.title.toLowerCase()}`}
				user={headerUser}
			/>
			<div className=" relative px-[10px] py-[70px] ">
				<HightLightsView
					displayPicture={me?.displayPicture ?? ""}
					eventId={event.id}
					searchParams={searchParams}
					event={event}
				/>
			</div>
		</div>
	);
}
