import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiTicket } from "react-icons/hi2";

export default function EventRegistrationCTA({ slug }: { slug: string }) {
  return (
    <div className=" mt-[30px] rounded-[20px] overflow-hidden  border border-accent  ">
      <div className=" bg-secondary">
        <p className=" px-[20px] py-[10px] text-[14px]">
          Registration Information
        </p>
      </div>
      <div className="px-[20px] flex items-center gap-2 py-[20px]">
        <div className=" w-[32px] rounded-[12px] h-[32px] flex items-center justify-center bg-secondary border border-accent">
          <HiTicket className=" w-[20px] h-[20px]" />
        </div>
        <div className="">
          <p className=" text-[14px]">Event admission is still ongoing</p>
          <p className=" text-[10px]">If you’d like, you can still register.</p>
        </div>
      </div>
      <hr className=" h-[0.5px]" />

      <div className=" px-[20px] flex gap-4 flex-col py-[15px]">
        <p className=" text-[14px]">
          Please click on the button below to register for the event. You will
          recieve an email notification for your entry
        </p>
        <Button
          asChild
          className=" rounded-[12px] py-[25px] font-semibold text-[16px]"
        >
          <Link href={`/user/events/${slug.toLowerCase()}/register`}>
            Register for event
          </Link>
        </Button>
      </div>
    </div>
  );
}
