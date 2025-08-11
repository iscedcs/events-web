import Header from "@/components/shared/layout/header";
import { getUserByID } from "../../../../../actions/user";
import { auth } from "../../../../../auth";

export default async function UserEvents() {
  const session = await auth();
  const user = await getUserByID(session?.user.id ?? "");

  console.log({ user });
  return (
    <div>
      <Header title="Events" user={user} />
      <p>Events Page</p>
    </div>
  );
}
