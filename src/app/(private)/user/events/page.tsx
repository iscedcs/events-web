import EventsTab from "@/components/pages/user/events/events-tab";
import Header from "@/components/shared/layout/header";
import { getUserByID } from "../../../../../actions/user";
import { auth } from "../../../../../auth";

export const dynamic = "force-dynamic";

export default async function UserEvents({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] };
}) {
  const session = await auth();
  const user = await getUserByID(session?.user.id ?? "");

  const tabParam = searchParams?.tab;
  const currentTab = Array.isArray(tabParam)
    ? tabParam[0]
    : tabParam || "manage";

  return (
    <div>
      <Header title="Events" user={user} />
      <div className="py-[70px]">
        <EventsTab initialTab={currentTab} />
      </div>
    </div>
  );
}
