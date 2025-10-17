import Header from "@/components/shared/layout/header";
import { getUserByID } from "../../../../../../actions/user";
import { getCurrentUser } from "../../../../../../actions/auth";

export default async function AllEvents() {
  const me = await getCurrentUser();
  const user = me ? await getUserByID(me.id!) : "";

  return (
    <div>
      <Header title="Events" user={user} />
      <div className="">
        <p>All Events</p>
      </div>
    </div>
  );
}
