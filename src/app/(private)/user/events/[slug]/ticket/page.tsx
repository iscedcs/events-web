import Header from "@/components/shared/layout/header";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/ui/secondary/copy-button";
import { TICKETTANDC } from "@/lib/const";
import { SingleTicketProps } from "@/lib/types/event";
import { copyToClipboard } from "@/lib/utils";
import { format } from "date-fns/format";
import Image from "next/image";
import Link from "next/link";
import { LuTicket } from "react-icons/lu";
import { MdOutlineMessage } from "react-icons/md";
import { PiCrownBold } from "react-icons/pi";
import { RxCaretRight } from "react-icons/rx";
import { getTicketByID } from "../../../../../../../actions/tickets";
import { getUserByID } from "../../../../../../../actions/user";
import { auth } from "../../../../../../../auth";

export default async function Ticket() {
  const session = await auth();
  const user = await getUserByID(session?.user.id ?? "");
  const ticket: SingleTicketProps = await getTicketByID(
    "ab37b92f-3976-45e5-8d98-da8f183022fa"
  );
  const text = "BLK21738745123";

  const handleCopy = async () => {
    await copyToClipboard(text);
  };

  return (
    <div>
      <Header hasBack title={`Ticket: ${ticket.event?.title}`} user={user} />
      <div className=" flex flex-col gap-6 px-[15px] pb-[20px] mt-[70px]">
        <div className=" relative p-[20px] bg-secondary rounded-[24px] ">
          <div className=" border-t-0 border-l-0 border border-accent pb-[20px] border-dashed  border-r-0 flex items-center gap-3">
            <Image
              alt="image"
              className="w-[90px] rounded-[20px] h-[90px] object-cover"
              src={
                ticket.event?.image?.startsWith("http") ||
                ticket.event?.image?.startsWith("/")
                  ? ticket.event?.image
                  : "/no-image.jpg"
              }
              width={1000}
              height={1000}
            />
            <div className=" flex flex-col">
              <div className={` flex items-center`}>
                {ticket.isFree ? (
                  <div className=" bg-success px-[8px] py-[3px] rounded-[12px]">
                    <LuTicket className="  w-[15px] h-[15px]" />
                  </div>
                ) : (
                  <div className="  bg-[#F9AA4B]">
                    <PiCrownBold className=" w-[15px] h-[15px]" />
                  </div>
                )}
              </div>
              <p className=" text-[18px] line-clamp-2 capitalize">
                {ticket.event?.title.toLowerCase()}
              </p>
              <p className=" capitalize text-[10px] text-accent">
                {ticket.event?.town.toLowerCase()}
              </p>
            </div>
          </div>
          <div className="  border-t-0 border-l-0 border py-[20px] border-accent  border-dashed  border-r-0">
            <p className=" text-[14px] text-accent">Venue</p>
            <p className=" text-[16px] capitalize ">
              {ticket.event?.location.toLowerCase()}
            </p>
            <div className=" flex gap-6 mt-[20px]">
              <div className="">
                <p className=" text-[14px] text-accent">Date</p>
                <p className="text-[16px]">
                  {format(ticket.event?.startDate ?? "", "MMM d, yyyy")}
                </p>
              </div>
              <div className="">
                <p className=" text-[14px] text-accent">Time</p>
                <p className="text-[16px]">{ticket.event?.time}</p>
              </div>
            </div>
            <div className=" flex justify-between items-end mt-[20px]">
              <div className="">
                <p className=" text-[14px] text-accent">Access Code</p>
                <div className=" flex gap-2 items-center">
                  <p>{text}</p>
                  <CopyButton height="16" width="16" text={text} />
                </div>
              </div>
              <Link href="" className=" flex items-center gap-2">
                <p className=" text-[14px]">View events page</p>
                <RxCaretRight />
              </Link>
            </div>
          </div>
          <div className=" flex justify-between items-end  pt-[20px]">
            <div className="">
              <Image
                src={"/dummy-images/qrcode.png"}
                alt="qrcode"
                width={"1000"}
                height={"1000"}
                className=" w-[100px] h-[100px] object-cover"
              />
            </div>
            <div className="">
              <Button className=" text-white bg-[#6600FF]" asChild>
                <Link href={""}>
                  Join chat
                  <MdOutlineMessage />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="relative p-[20px] bg-secondary rounded-[24px]">
          <p className=" text-[16px]">Terms and Conditions</p>
          <ul className=" px-[20px] flex gap-3 flex-col mt-[10px] text-accent">
            {TICKETTANDC.map((item, k) => (
              <li className=" text-[14px] list-disc" key={k}>
                {item}
              </li>
            ))}
          </ul>
          <Button className=" mt-[20px] py-[23px] text-[16px] font-semibold rounded-[12px] w-full">
            Download Ticket
          </Button>
        </div>
      </div>
    </div>
  );
}
