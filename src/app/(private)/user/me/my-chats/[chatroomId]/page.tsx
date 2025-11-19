import React from "react";
import { getCurrentUser } from "../../../../../../../actions/auth";
import { getUserByID } from "../../../../../../../actions/user";
import Header from "@/components/shared/layout/header";
import {
  getAttendeeInformationForChat,
  getAttendeeInformationForChatroom,
  getChatroomByID,
} from "../../../../../../../actions/chat";
import Chatroom from "@/components/pages/user/chats/chatroom/chatroom";
import { getEventsByID } from "../../../../../../../actions/events";
import { SingleEventProps } from "@/lib/types/event";

type Params = Promise<{ chatroomId: string }>;
export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const me = await getCurrentUser();
  const userId = me?.id ?? null;
  const headerUser = userId ? await getUserByID(userId) : null;
  const chatroomInfo = await getChatroomByID(params.chatroomId);
  const event: SingleEventProps = await getEventsByID(
    chatroomInfo?.event_id ?? ""
  );

  const attendee = await getAttendeeInformationForChatroom({
    participantA: chatroomInfo?.participantA ?? "",
    participantB: chatroomInfo?.participantB ?? "",
  });

  const singleAttendee = await getAttendeeInformationForChat({
    participantA: chatroomInfo?.participantA ?? "",
    participantB: chatroomInfo?.participantB ?? "",
  });

  return (
    <div>
      <Header
        hasBack
        title={`Private Chat: ${singleAttendee?.name}`}
        user={headerUser}
      />
      <div className=" w-full fixed mt-[55px]">
        <Chatroom
          event={event}
          chatRoomId={chatroomInfo?.id ?? ""}
          chatRoomType="private"
          attendee={attendee?.attendee}
        />
      </div>
    </div>
  );
}
