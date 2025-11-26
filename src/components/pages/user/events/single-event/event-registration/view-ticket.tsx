import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineArrowRightAlt } from "react-icons/md";

export default function ViewTicket({
  slug,
  ticketId,
}: {
  slug: string;
  ticketId: string;
}) {
  return (
    <div>
      <div className=" mt-[30px] rounded-[20px] overflow-hidden  border border-accent  ">
        <div className=" bg-secondary">
          <p className=" px-[20px] py-[10px] text-[14px]">
            Registration Information
          </p>
        </div>
        <div className="px-[20px] flex items-center gap-2 py-[20px]">
          <div className="">
            <Image
              alt="image"
              src={"/resources/loading-screen.gif"}
              width={"1000"}
              height={"1000"}
              className=" w-[40px] h-[40px] object-cover rounded-full"
            />
            <p className=" text-[14px]">You're in</p>
          </div>
        </div>
        <hr className=" h-[0.5px]" />

        <div className=" px-[20px] flex gap-4 flex-col py-[15px]">
          <p className=" text-[14px]">
            You now have access to this event and it's features. View your
            ticket or join the chatroom.
          </p>
          <div className="">
            <Button
              asChild
              className=" rounded-[12px] py-[10px] font-semibold text-[14px]"
            >
              <Link
                href={`/user/events/${slug.toLowerCase()}/ticket/${ticketId}`}
              >
                View ticket
                <MdOutlineArrowRightAlt />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
