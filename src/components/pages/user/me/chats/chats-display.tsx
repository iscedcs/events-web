"use client";

import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import SingleChatCard from "./single-chat-card";

export default function ChatsDisplay() {
  return (
    <div className=" w-full">
      <Tabs defaultValue="private" className=" w-full">
        <TabsList className=" text-[13px]  h-full bg-secondary w-full grid grid-cols-2">
          <TabsTrigger
            className=" data-[state=active]:bg-white py-[8px] data-[state=active]:text-black rounded-full"
            value="private"
          >
            Private Chats
          </TabsTrigger>
          <TabsTrigger
            className=" data-[state=active]:bg-white data-[state=active]:text-black py-[8px] rounded-full"
            value="group"
          >
            Event Chats
          </TabsTrigger>
        </TabsList>
        <TabsContent value="private">
          <SingleChatCard isPrivate />
        </TabsContent>
        <TabsContent value="group">
          <SingleChatCard isPrivate={false} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
