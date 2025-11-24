import { SingleEventProps } from "@/lib/types/event";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineChat } from "react-icons/md";

export default function EventChatButton({
  event,
}: {
  event: SingleEventProps;
}) {
  return (
    <div>
      <Link
        href={`/user/events/${event?.cleanName.toLowerCase()}/chat`}
        className=" flex gap-4 items-center justify-between  bg-secondary mt-[56px] py-[10px]  px-[10px] "
      >
        <div className=" flex gap-4 items-center">
          <Image
            src={
              event?.image?.startsWith("http") || event?.image?.startsWith("/")
                ? event.image
                : "/no-image.png"
            }
            alt="image"
            width={"1000"}
            height={"1000"}
            className=" w-[48px] border border-white h-[48px] rounded-full object-cover"
          />
          <div className="">
            <p className=" text-[16px] font-medium">Event Chat</p>
            <p className=" text-accent text-[12px]">
              Join others and participate in event discussions.
            </p>
          </div>
        </div>
        <div className="">
          <MdOutlineChat className=" w-[20px] h-[20px]" />
        </div>
      </Link>
    </div>
  );
}
