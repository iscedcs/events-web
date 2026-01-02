import FeedCreateView from "@/components/pages/user/events/highlights/feeds/feed-create";
import Header from "@/components/shared/layout/header";
import { SingleEventProps } from "@/lib/types/event";
import { getCurrentUser } from "../../../../../../../../../actions/auth";
import { getEventsByCleanName } from "../../../../../../../../../actions/events";
import { getUserByID } from "../../../../../../../../../actions/user";

type Params = Promise<{ slug: string }>;
export default async function FeedCreate(props: { params: Params }) {
	const params = await props.params;
	const me = await getCurrentUser();

	const formattedProps = encodeURIComponent(params.slug);
	const event: SingleEventProps = await getEventsByCleanName(
		formattedProps ?? ""
	);

	const userId = me?.id ?? null;
	const headerUser = userId ? await getUserByID(userId) : null;

	return (
		<div>
			<Header hasBack title={`Post feed`} user={headerUser} />
			<div className=" relative px-[10px] py-[70px] ">
				<FeedCreateView eventId={event.id} />
			</div>
		</div>
	);
}
