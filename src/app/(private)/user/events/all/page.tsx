import Header from "@/components/shared/layout/header";
import { getCurrentUser } from "../../../../../../actions/auth";
import { getUserByID } from "../../../../../../actions/user";

export default async function AllEvents() {
  const me = await getCurrentUser();
  const user = me ? await getUserByID(me.id!) : null;

  return (
    <div>
      <Header title="Events" user={user} />
      <div className="">
        <p>All Events</p>
      </div>
    </div>
  );
}
