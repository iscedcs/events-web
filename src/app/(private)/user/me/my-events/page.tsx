import Header from "@/components/shared/layout/header";
import { getCurrentUser } from "../../../../../../actions/auth";
import { getUserByID } from "../../../../../../actions/user";
import EventDisplay from "@/components/pages/user/me/events/event-display";

export default async function MyEvent() {
  const me = await getCurrentUser();
  const user = await getUserByID(me?.id ?? "");
  return (
    <div>
      <Header hasBack title={"My Events"} user={user} />
      <div className=" px-[10px] pt-[70px]">
        <EventDisplay />
      </div>
    </div>
  );
}
