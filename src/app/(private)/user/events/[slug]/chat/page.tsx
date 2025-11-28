import Chatroom from "@/components/pages/user/chats/chatroom/chatroom";
import Header from "@/components/shared/layout/header";
import { SingleEventProps } from "@/lib/types/event";
import { getAuthInfo, getCurrentUser } from "../../../../../../../actions/auth";
import { getEventChatroomByEventID } from "../../../../../../../actions/chat";
import {
  getEventsByCleanName
} from "../../../../../../../actions/events";
import { getUserByID } from "../../../../../../../actions/user";

type Params = Promise<{ slug: string }>;
export default async function ChatRoom(props: { params: Params }) {
  const params = await props.params;
  const me = await getCurrentUser();
  const userId = me?.id ?? null;
  const headerUser = userId ? await getUserByID(userId) : null;
  const event: SingleEventProps = await getEventsByCleanName(params.slug);
  const chatroomInfo = await getEventChatroomByEventID(event?.id);

  // console.log({ chatroomInfo });

  const auth = await getAuthInfo();

  const attendee = event.attendees.find(
    (attendee) => attendee.userId === auth.user?.id
  );

  console.log({ attendee })

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
