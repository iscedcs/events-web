import React from "react";
import { getCurrentUser } from "../../../../../../actions/auth";
import { getUserByID } from "../../../../../../actions/user";
import Header from "@/components/shared/layout/header";
import EditUserForm from "@/components/forms/edit-user/edit";

export default async function Edit() {
  const me = await getCurrentUser();
  const user = await getUserByID(me?.id ?? "");
  return (
    <div>
      <Header hasBack title={"Edit profile"} user={user} />
      <div className=" px-2.5 pt-[70px]">
        <EditUserForm id={me?.id ?? ""} user={user} />
      </div>
    </div>
  );
}
