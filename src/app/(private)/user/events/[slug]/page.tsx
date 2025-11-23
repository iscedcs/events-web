import CreatorEvent from "@/components/pages/user/events/single-event/creator-event/creator-event";
import EventRegistration from "@/components/pages/user/events/single-event/event-registration/event-registration";
import Header from "@/components/shared/layout/header";
import { SingleEventProps } from "@/lib/types/event";
import { getEventsByCleanName } from "../../../../../../actions/events";
import { getUserByID } from "../../../../../../actions/user";
import NotFound from "./not-found";
import { getCurrentUser } from "../../../../../../actions/auth";

type Params = Promise<{ slug: string }>;
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
      <Header hasBack title={event?.title.toLowerCase()} user={headerUser} />
      {isOwner ? (
        <CreatorEvent slug={params.slug} />
      ) : (
        <EventRegistration slug={params.slug} />
      )}
    </div>
  );
}
