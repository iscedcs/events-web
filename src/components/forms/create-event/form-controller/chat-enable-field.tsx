import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineMessage } from "react-icons/md";

export default function ChatEnableField() {
  return (
    <div className="">
      <div className=" mt-[10px] flex items-center justify-between">
        <div className=" flex items-center gap-2">
          <MdOutlineMessage />
          <p className=" text-white">Event chat</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <div className=" flex items-center gap-2">
              <p>Enabled</p>
              <AiOutlineEdit />
            </div>
          </DialogTrigger>
          <DialogContent className=" bg-secondary border-0">
            <DialogTitle hidden>Content</DialogTitle>
            <p className="">Event Host Name</p>

            <p className=" text-accent text-[12px]">
              A group chat can be created for every event in order for attendees
              to keep in touch.
            </p>

            <div className=" flex flex-row gap-3 items-center">
              <p className=" text-accent">
                Event Chatroom is enabled by default
              </p>
              <Switch checked disabled />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
