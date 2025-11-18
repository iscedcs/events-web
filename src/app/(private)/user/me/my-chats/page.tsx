import Header from "@/components/shared/layout/header";
import React from "react";
import { getCurrentUser } from "../../../../../../actions/auth";
import { getUserByID } from "../../../../../../actions/user";
import ChatsDisplay from "@/components/pages/user/me/chats/chats-display";

export default async function MyChats() {
  const me = await getCurrentUser();
  const user = await getUserByID(me?.id ?? "");

  // console.log({ me });

  return (
    <div>
      <Header hasBack title={"My Chats"} user={user} />
      <div className=" px-[10px] pt-[70px]">
        <ChatsDisplay />
      </div>
    </div>
  );
}
