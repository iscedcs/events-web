import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";

export default function SingleChatCard({
  isPrivate,
  eventTitle,
  chatroomId,
  attendeeName,
  image,
}: {
  isPrivate: boolean;
  eventTitle: string;
  attendeeName: string;
  chatroomId: string;
  image: string | null;
}) {
  // console.log({ image });
  if (isPrivate) {
    return (
      <Link href={`my-chats/${chatroomId}`}>
        <div className=" w-full bg-secondary py-[10px] px-[10px] rounded-[10px]">
          <div className=" w-full flex items-center flex-row gap-2">
            {image !== null ? (
              <Image
                src={image ?? "/no-profile.jpg"}
                alt="image"
                width={"50"}
                height={"50"}
                className=" rounded-full w-[50px] h-[50px] object-cover "
              />
            ) : (
              <div className=" w-[50px] h-[50px] rounded-full flex items-center justify-center bg-accent">
                <FaUser className=" text-secondary" />
              </div>
            )}
            <div className=" w-[80%] flex flex-row items-center justify-between">
              <div className="">
                <p className=" capitalize">{attendeeName.toLowerCase()}</p>
                <p className=" capitalize text-[13px] text-accent">
                  Event: {eventTitle.toLowerCase()}
                </p>
              </div>
              <MoveRight />
            </div>
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link href={""}>
      <div className=" w-full bg-secondary py-[10px] px-[10px] rounded-[10px]">
        <div className=" w-full flex items-center flex-row gap-2">
          <div className=" w-[50px] h-[50px] rounded-full flex items-center justify-center bg-accent">
            <MdGroups2 className=" text-secondary w-7 h-7" />
          </div>
          <div className=" w-[80%] flex flex-row items-center justify-between">
            <div className="">
              <p>Ade's Birthday Party</p>
              <p className=" text-[13px] text-accent">200 participants</p>
            </div>
            <MoveRight />
          </div>
        </div>
      </div>
    </Link>
  );
}
