import Header from "@/components/shared/layout/header";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/ui/secondary/copy-button";
import { TICKETTANDC } from "@/lib/const";
import { SingleAttendeeProps } from "@/lib/types/event";
import { SingleTicketProps } from "@/lib/types/ticket";
import { format } from "date-fns/format";
import Image from "next/image";
import Link from "next/link";
import { LuTicket } from "react-icons/lu";
import { MdOutlineMessage } from "react-icons/md";
import { PiCrownBold } from "react-icons/pi";
import { RxCaretRight } from "react-icons/rx";
import {
  getAttendeeID,
  getAttendeesEventID,
} from "../../../../../../../../actions/attendee";
import { getCurrentUser } from "../../../../../../../../actions/auth";
import { getTicketByID } from "../../../../../../../../actions/tickets";
import { getUserByID } from "../../../../../../../../actions/user";
import QrCodeGenerator from "@/components/pages/user/events/single-event/attendee-check-in/qr-code-gen";
import { stripTime } from "@/lib/utils";
import { isAfter, isBefore, isEqual } from "date-fns";

type Params = Promise<{ id: string }>;

export default async function Ticket(props: { params: Params }) {
  const params = await props.params;

  const me = await getCurrentUser();

  const user = me ? await getUserByID(me.id!) : "";
  const ticket: SingleTicketProps = await getTicketByID(params.id);
  const attendees: SingleAttendeeProps[] = await getAttendeesEventID(
    ticket.event?.id ?? ""
  );

  const singleAttendeeID =
    attendees.find((attendee) => attendee.userId === me?.id)?.id ?? "";

  const attendee: SingleAttendeeProps = await getAttendeeID(singleAttendeeID);

  console.log({ singleAttendeeID });

  const token = attendee.token;

  const now = stripTime(new Date());
  const startDate = stripTime(new Date(ticket?.event?.startDate ?? now));
  const endDate = stripTime(new Date(ticket?.event?.endDate ?? now));

  // console.log({ startDate, endDate, now });

  // console.log(isEqual(now, startDate));

  const baseUrl = process.env.NEXT_PUBLIC_URL;

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
              <div className={` flex gap-2 items-center`}>
                <p className=" text-accent text-[12px]">{ticket.title}</p>
                {ticket.isFree ? (
                  <div className=" bg-success px-[8px] py-[3px] rounded-[12px]">
                    <LuTicket className="  w-[15px] h-[15px]" />
                  </div>
                ) : (
                  <div className="px-[8px] py-[3px] rounded-[12px]  bg-[#F9AA4B]">
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
                <p className="text-[16px]">
                  {ticket.event?.time ?? "No time provided"}
                </p>
              </div>
            </div>
            <div className=" flex justify-between items-end mt-[20px]">
              <div className="">
                <p className=" text-[14px] text-accent">Access Code</p>
                <div className=" flex gap-2 items-center">
                  <p>{token}</p>
                  <CopyButton height="16" width="16" text={token} />
                </div>
              </div>
              <Link
                href={`/user/events/${ticket.event?.cleanName.toLowerCase()}`}
                className=" flex items-center gap-2"
              >
                <p className=" text-[14px]">View events page</p>
                <RxCaretRight />
              </Link>
            </div>
          </div>
          <div className=" flex justify-between items-end  pt-[20px]">
            <div className=" rounded-[8px] py-[8px] px-[9px] bg-white">
              <QrCodeGenerator size={100} value={`${attendee.id}`} />
            </div>
            {isBefore(now, endDate) && (
              <div className="">
                <Button className=" text-white bg-[#6600FF]" asChild>
                  <Link
                    href={`/user/events/${ticket.event?.cleanName.toLowerCase()}/chat`}
                  >
                    Join chat
                    <MdOutlineMessage />
                  </Link>
                </Button>
              </div>
            )}
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
