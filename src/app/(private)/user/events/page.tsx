import EventsTab from "@/components/pages/user/events/events-tab";
import Header from "@/components/shared/layout/header";
import { type NextPage } from "next";
import { getUserByID } from "../../../../../actions/user";
import { auth } from "../../../../../auth";

export const dynamic = "force-dynamic";

type UserEventsProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const UserEvents: NextPage<UserEventsProps> = async ({ searchParams }) => {
  const session = await auth();
  const user = await getUserByID(session?.user.id ?? "");

  const resolvedSearchParams = await searchParams;
  const tabParam = resolvedSearchParams?.tab;
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
};

export default UserEvents;
