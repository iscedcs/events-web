import EventsTab from "@/components/pages/user/events/events-tab";
import Header from "@/components/shared/layout/header";
import { getUserByID } from "../../../../../actions/user";
import { auth } from "../../../../../auth";

export const dynamic = "force-dynamic";

type searchParams = { q?: string };

export default async function UserEvents(props: {
  searchParams: searchParams;
}) {
  const session = await auth();

  const user = await getUserByID(session?.user.id ?? "");
  const searchParams = await props.searchParams;

  const currentTab = searchParams.q || "manage";

  // console.log({ user });
  return (
    <div>
      <Header title="Events" user={user} />
      <div className="  py-[70px]">
        <EventsTab initialTab={currentTab} />
      </div>
    </div>
  );
}
