import CreatorEvent from "@/components/pages/user/events/single-event/creator-event/creator-event";
import EventRegistration from "@/components/pages/user/events/single-event/event-registration/event-registration";
import Header from "@/components/shared/layout/header";
import { SingleEventProps } from "@/lib/types/event";
import { getEventsByCleanName } from "../../../../../../actions/events";
import { getUserByID } from "../../../../../../actions/user";
import NotFound from "./not-found";
import { getCurrentUser } from "../../../../../../actions/auth";
import { ResolvingMetadata } from "next";

type Params = Promise<{ slug: string }>;

export const generateMetadata = async (
	props: { params: Params },
	parent: ResolvingMetadata
) => {
	const params = await props.params;
	const formattedProps = encodeURIComponent(params.slug);
	const event: SingleEventProps = await getEventsByCleanName(
		formattedProps ?? ""
	);

	if (event === null || event === undefined) {
		return {
			title: "Page not found",
			description: "This page you are trying to access does not exist.",
		};
	}

	return {
		title: event.title,
		description: `${event.description}`,
		openGraph: {
			images: [
				{
					url: event.image,
					width: 1200,
					height: 630,
				},
			],
			twitter: {
				card: "summary_large_image",
				title: event.title,
				description: event.description,
				images: [event.image],
			},
		},
	};
};
export default async function SingleEvent(props: { params: Params }) {
	const params = await props.params;
	const me = await getCurrentUser();
	const userId = me?.id ?? null;
	const formattedProps = encodeURIComponent(params.slug);
	const event: SingleEventProps = await getEventsByCleanName(
		formattedProps ?? ""
	);

	if (!event) {
		return <NotFound />;
	}
	const headerUser = userId ? await getUserByID(userId) : null;

	const isOwner: boolean = !!userId && userId === event.userId;
	// console.log({ isOwner });
	return (
		<div>
			<Header
				hasBack
				title={event?.title.toLowerCase()}
				user={headerUser}
			/>
			{isOwner ? (
				<CreatorEvent slug={params.slug} />
			) : (
				<EventRegistration slug={params.slug} />
			)}
		</div>
	);
}
