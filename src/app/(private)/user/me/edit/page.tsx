import React from "react";
import { getCurrentUser } from "../../../../../../actions/auth";
import { getUserByID } from "../../../../../../actions/user";
import Header from "@/components/shared/layout/header";
import EditUserForm from "@/components/pages/user/me/profile/edit/edit-form";

export default async function Edit() {
  const me = await getCurrentUser();
  const user = await getUserByID(me?.id ?? "");
  return (
    <div>
      <Header hasBack title={"Edit profile"} user={user} />
      <div className=" px-[10px] pt-[70px]">
        <EditUserForm user={user} />
      </div>
    </div>
  );
}
