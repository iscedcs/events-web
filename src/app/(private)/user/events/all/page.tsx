import Header from "@/components/shared/layout/header";
import { getUserByID } from "../../../../../../actions/user";
import { auth } from "../../../../../../auth";

export default async function AllEvents() {
  const session = await auth();
  const user = await getUserByID(session?.user.id ?? "");

  return (
    <div>
      <Header title="Events" user={user} />
      <div className="">
        <p>All Events</p>
      </div>
    </div>
  );
}
