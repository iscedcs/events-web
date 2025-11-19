"use client";

import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import SingleChatCard from "./single-chat-card";
import SingleChatCardSkeleton from "@/components/skeletons/single-chat-card";
import { useAuthInfo } from "@/hooks/use-auth-info";
import {
  getAttendeeInformationForChat,
  getPrivateChatroomForUser,
} from "../../../../../../actions/chat";
import { useEffect, useState } from "react";
import { SinglePrivateChatroomProps } from "@/lib/types/chat";
import { MessageCircleDashed } from "lucide-react";

export default function ChatsDisplay() {
  const { auth: session } = useAuthInfo();
  const userId = session?.user.id;

  const [privateChatrooms, setPrivateChatrooms] = useState<
    SinglePrivateChatroomProps[]
  >([]);
  const [attendeeInfoMap, setAttendeeInfoMap] = useState<
    Record<string, { name: string; image: string }>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const rooms = await getPrivateChatroomForUser(userId);
        const chatrooms = rooms ?? [];

        setPrivateChatrooms(chatrooms);

        // fetch attendee info for each chatroom
        const attendeePromises = chatrooms.map(async (room) => {
          const { participantA, participantB, chatRoomId } = room;

          // determine the other person
          const other =
            participantA.attendeeId === userId
              ? participantB.attendeeId
              : participantA.attendeeId;

          const info = await getAttendeeInformationForChat({
            participantA: participantA.attendeeId,
            participantB: participantB.attendeeId,
          });

          return {
            chatRoomId,
            info: info
              ? { name: info.name, image: info.image }
              : { name: "", image: "" },
          };
        });

        // Wait for all attendee info fetches
        const attendees = await Promise.all(attendeePromises);

        // convert to map
        const map: Record<string, { name: string; image: string }> = {};
        attendees.forEach((a) => {
          map[a.chatRoomId] = a.info;
        });

        setAttendeeInfoMap(map);
      } catch (e) {
        console.log("Error fetching chat data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="w-full">
      <Tabs defaultValue="private" className="w-full">
        <TabsList className="text-[13px] h-full bg-secondary w-full grid grid-cols-2">
          <TabsTrigger
            className="data-[state=active]:bg-white py-[8px] data-[state=active]:text-black rounded-full"
            value="private"
          >
            Private Chats
          </TabsTrigger>

          <TabsTrigger
            className="data-[state=active]:bg-white data-[state=active]:text-black py-[8px] rounded-full"
            value="group"
          >
            Event Chats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="private">
          {loading ? (
            <SingleChatCardSkeleton />
          ) : (
            <>
              {privateChatrooms.length === 0 ? (
                <div className=" flex items-center absolute translate-y-1/2 translate-x-1/2 justify-center flex-col gap-3 text-accent">
                  <MessageCircleDashed className=" w-14 h-14" />
                  <p>No private  chatrooms yet</p>
                </div>
              ) : (
                <div className=" flex flex-col gap-4">
                  {privateChatrooms.map((room) => {
                    const attendee = attendeeInfoMap[room.chatRoomId];

                    return (
                      <SingleChatCard
                        key={room.chatRoomId}
                        chatroomId={room.chatRoomId}
                        attendeeName={attendee?.name ?? ""}
                        image={attendee?.image ?? null}
                        eventTitle={room.eventTitle}
                        isPrivate={room.isPrivate}
                      />
                    );
                  })}
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent className=" " value="group">
          <div className=" flex items-center absolute translate-y-1/2 translate-x-1/2 justify-center flex-col gap-3 text-accent">
            <MessageCircleDashed className=" w-14 h-14" />
            <p>No event chatrooms yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
