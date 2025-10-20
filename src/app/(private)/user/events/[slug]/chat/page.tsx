import Header from "@/components/shared/layout/header";
import React from "react";
import { getAuthInfo, getCurrentUser } from "../../../../../../../actions/auth";
import { getUserByID } from "../../../../../../../actions/user";
import { getEventChatroomByEventID } from "../../../../../../../actions/chat";
import {
  getEventIdByCleanName,
  getEventsByCleanName,
} from "../../../../../../../actions/events";
import Chatroom from "@/components/pages/user/chats/chatroom/chatroom";
import { SingleEventProps } from "@/lib/types/event";

type Params = Promise<{ slug: string }>;
export default async function ChatRoom(props: { params: Params }) {
  const params = await props.params;
  const me = await getCurrentUser();
  const userId = me?.id ?? null;
  const headerUser = userId ? await getUserByID(userId) : null;
  const event: SingleEventProps = await getEventsByCleanName(params.slug);
  const chatroomInfo = await getEventChatroomByEventID(event?.id);

  const auth = await getAuthInfo();

  const attendee = event.attendees.find(
    (attendee) => attendee.userId === auth.user?.id
  );

  return (
    <div>
      <Header
        hasBack
        title={chatroomInfo?.event_name.toLowerCase() ?? ""}
        user={headerUser}
      />
      <div className=" w-full fixed mt-[55px]">
        <Chatroom
          event={event}
          chatRoomId={chatroomInfo?.id ?? ""}
          chatRoomType="group"
          attendee={attendee}
        />
      </div>
    </div>
  );
}
