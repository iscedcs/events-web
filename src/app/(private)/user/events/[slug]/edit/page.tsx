import EditEvents from "@/components/pages/user/events/edit-events/edit-events";
import Header from "@/components/shared/layout/header";
import { SingleEventProps } from "@/lib/types/event";
import { getCurrentUser } from "../../../../../../../actions/auth";
import { getEventsByCleanName } from "../../../../../../../actions/events";
import { getUserByID } from "../../../../../../../actions/user";

type Params = Promise<{ slug: string }>;
export default async function Edit(props: { params: Params }) {
  const params = await props.params;

  const formattedProps = encodeURIComponent(params.slug);
  const event: SingleEventProps = await getEventsByCleanName(
    formattedProps ?? ""
  );
  const me = await getCurrentUser();

  const userId = me?.id ?? null;
  const headerUser = userId ? await getUserByID(userId) : null;

  return (
    <div>
      <Header
        hasBack
        title={`Edit: ${event?.title.toLowerCase()}`}
        user={headerUser}
      />
      <div className=" px-[10px] py-[70px] ">
        <p className=" font-bold text-[24px]">Edit event information</p>
        <EditEvents event={event} />
      </div>
    </div>
  );
}
