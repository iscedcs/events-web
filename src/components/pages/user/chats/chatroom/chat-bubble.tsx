import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SingleChatMessageProps, SingleMessageProps } from "@/lib/types/chat";
import { getRandomTextColor } from "@/lib/utils";
import { timeStamp } from "console";
import { format } from "date-fns";
import {
  AlertCircle,
  Check,
  Clock,
  EllipsisVertical,
  MessageCircleReply,
  PencilLine,
  RotateCcw,
  Trash2,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import React from "react";

export default function ChatBubble({
  isCurrentUser,
  message,
  onPrivateChat,
  onRetry,
}: SingleMessageProps) {
  //   const colorRender = getRandomTextColor();

  // console.log({ message });

  // const timestamp = new Date(message.timestamp).toLocaleTimeString("en-US", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   hour12: false,
  // });

  const timestamp = message?.timestamp
    ? format(new Date(message.timestamp), "p")
    : "";

  if (isCurrentUser) {
    return (
      <div className="flex flex-row-reverse items-start gap-2">
        <Image
          alt="image"
          width={30}
          height={30}
          className="rounded-full w-[30px] h-[30px] object-cover"
          src={message.sender.displayPicture ?? "/no-profile.png"}
        />
        <div className="flex flex-col items-end">
          <div className="flex gap-3">
            <p
              className={`capitalize text-[12px] ${getRandomTextColor(
                message.sender.name
              )}`}
            >
              You
            </p>
            <p className="text-accent text-[12px]">{timestamp}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="w-[90%] text-left text-[12px] mt-[3px] rounded-bl-0 bg-secondary px-[25px] rounded-l-[20px] rounded-br-[20px] py-[12px]">
              {message.message}
            </div>
            <div className="text-accent text-[12px] mt-[5px]">
              {renderMessageStatus(message, onRetry)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (message.isFromCreator) {
    return (
      <div className="flex items-start gap-2">
        <Image
          alt="image"
          width={30}
          height={30}
          className="rounded-full w-[30px] h-[30px] object-cover"
          src={message.sender.displayPicture ?? "/no-profile.png"}
        />
        <div>
          <div className="flex gap-3">
            <p
              className={`capitalize text-[12px] ${getRandomTextColor(
                message.sender.name
              )}`}
            >
              {message.sender.name} · host
            </p>
            <p className="text-accent text-[12px]">{timestamp}</p>
          </div>
          <div className="flex items-center">
            <div className="w-[90%] text-[12px] mt-[3px] rounded-tl-0 bg-secondary px-[25px] rounded-r-[20px] rounded-bl-[20px] py-[12px]">
              {message.message}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Other attendees
  return (
    <div className="flex items-start gap-2">
      <Image
        alt="image"
        width={30}
        height={30}
        className="rounded-full w-[30px] h-[30px] object-cover"
        src={message.sender.displayPicture ?? "/no-profile.png"}
      />
      <div>
        <div className="flex gap-3">
          <p
            className={`capitalize text-[12px] ${getRandomTextColor(
              message.sender.name
            )}`}
          >
            {message.sender.name}
          </p>
          <p className="text-accent text-[12px]">{timestamp}</p>
        </div>
        <div className="flex items-center">
          <div className="w-[90%] text-[12px] mt-[3px] rounded-tl-0 bg-secondary px-[25px] rounded-r-[20px] rounded-bl-[20px] py-[12px]">
            {message.message}
          </div>
        </div>
        {/* <Drawer>
          {" "}
          <DrawerTrigger>
            {" "}
            <EllipsisVertical className=" w-5 h-5 text-accent" />{" "}
          </DrawerTrigger>{" "}
          <DrawerContent className=" bg-secondary px-[20px] pb-[30px]">
            {" "}
            <DrawerTitle className=" font-black text-center">
              {" "}
              CHAT OPTIONS{" "}
            </DrawerTitle>{" "}
            <div className=" flex flex-col gap-2 mt-[20px]">
              {" "}
              <span className=" flex gap-2 items-center">
                {" "}
                <UserRound className=" w-4 h-4" /> <p>View profile</p>{" "}
              </span>{" "}
              {message.isFromCreator ? (
                <span className=" flex gap-2 items-center">
                  {" "}
                  <MessageCircleReply className=" w-4 h-4" />{" "}
                  <p>Private chat host</p>{" "}
                </span>
              ) : (
                <span className=" flex gap-2 items-center">
                  {" "}
                  <MessageCircleReply className=" w-4 h-4" />{" "}
                  <p>Private chat attendee</p>{" "}
                </span>
              )}{" "}
            </div>{" "}
          </DrawerContent>{" "}
        </Drawer> */}
      </div>
    </div>
  );
}

function renderMessageStatus(
  message: SingleChatMessageProps,
  onRetry?: (message: SingleChatMessageProps) => void
) {
  switch (message.status) {
    case "sending":
      return (
        <div className="flex items-center gap-1 text-zinc-400">
          <Clock className="h-3 w-3 animate-pulse" />
          <span className="text-xs">Sending...</span>
        </div>
      );
    case "sent":
      return (
        <div className="flex items-center gap-1 text-zinc-400">
          <Check className="h-3 w-3" />
          <span className="text-xs">Delivered</span>
        </div>
      );
    case "failed":
      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-red-400">
            <AlertCircle className="h-3 w-3" />
            <span className="text-xs">Failed</span>
          </div>
          {onRetry && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRetry(message)}
              className="h-6 px-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Retry
            </Button>
          )}
        </div>
      );
    default:
      return <span className="text-xs text-zinc-400">Delivered</span>;
  }
}
