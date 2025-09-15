import CreatorEvent from "@/components/pages/user/events/single-event/creator-event/creator-event";
import EventRegistration from "@/components/pages/user/events/single-event/event-registration/event-registration";
import Header from "@/components/shared/layout/header";
import { SingleEventProps } from "@/lib/types/event";
import { getEventsByCleanName } from "../../../../../../actions/events";
import { getUserByID } from "../../../../../../actions/user";
import { auth } from "../../../../../../auth";
import NotFound from "./not-found";

type Params = Promise<{ slug: string }>;
export default async function SingleEvent(props: { params: Params }) {
  const params = await props.params;
  const session = await auth();
  const user = await getUserByID(session?.user.id ?? "");
  const formattedProps = encodeURIComponent(params.slug);
  const event: SingleEventProps = await getEventsByCleanName(
    formattedProps ?? ""
  );

  if (!event) {
    return <NotFound />;
  }

  const isOwner: boolean = session?.user.id === event.userId;
  console.log({ isOwner });
  return (
    <div>
      <Header hasBack title={event?.title.toLowerCase()} user={user} />
      {isOwner ? (
        <CreatorEvent slug={params.slug} />
      ) : (
        <EventRegistration slug={params.slug} />
      )}
    </div>
  );
}
