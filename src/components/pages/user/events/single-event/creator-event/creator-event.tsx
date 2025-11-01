import EventChatButton from "@/components/shared/event/event-chat-button";
import { Button } from "@/components/ui/button";
import { formatWithCommas } from "@/lib/utils";
import { format } from "date-fns/format";
import { PencilLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaBagShopping, FaHourglass, FaTicketSimple } from "react-icons/fa6";
import { MdFreeBreakfast } from "react-icons/md";
import { getEventWithTenAttendeesByCleanName } from "../../../../../../../actions/events";
import { getTicketsByEventID } from "../../../../../../../actions/tickets";

export default async function CreatorEvent({ slug }: { slug: string }) {
  const formattedProps = encodeURIComponent(slug);
  const data = await getEventWithTenAttendeesByCleanName(formattedProps ?? "");
  const tickets = await getTicketsByEventID(data?.event.id);
  const today = new Date();
  const eventStartDate = new Date(data?.event?.startDate);
  const eventEndDate = new Date(data?.event?.endDate);
  const currentTime = format(new Date(), "p");
  const eventTime = data?.event.time;
  var message = "";
  var isToday;

  console.log({ eventStartDate });
  console.log({ eventEndDate });
  console.log("Event time", data?.event.time);

  console.log("Current time", format(new Date(), "p"));

  const isTime = currentTime === eventTime;

  switch (true) {
    case today < eventStartDate && today > eventEndDate:
      message = `Event is not today`;
      isToday = false;
      break;
    case today > eventEndDate && today > eventStartDate:
      message = "Event is over";
      isToday = false;
      break;
    default:
      message = "Event is today";
      isToday = true;
      break;
  }
  return (
    <>
      <EventChatButton event={data?.event} />
      <div className="px-[10px] py-[20px]">
        <div className="">
          <p className=" text-[24px] font-extrabold capitalize ">
            {data?.event?.title?.toLowerCase() ?? ""}
          </p>
          <p className=" text-[16px]">
            {message}, {format(data?.event?.startDate ?? new Date(), "PPPP")}
          </p>
          {data?.event?.time && (
            <p className=" text-accent text-[14px]">
              {data?.event?.time} GMT +1
            </p>
          )}
        </div>
        {/* {(isTime || today < eventEndDate) && ( */}
          <div className="">
            <Button
              asChild
              className=" mt-[30px] flex flex-row items-center w-full rounded-[12px] font-semibold py-[24px]"
            >
              <Link
                href={`/user/events/${data?.event.cleanName.toLowerCase()}/check-in`}
              >
                Begin Contactless Entry
              </Link>
            </Button>
          </div>
        {/* )} */}
        <div className="">
          <div className=" flex mt-[20px] items-center justify-between">
            <p className=" text-[24px]">Tickets</p>
            {today < eventEndDate && today < eventStartDate && (
              <Button asChild>
                <Link href={"/user/events/party-3025/edit"}>
                  Edit event
                  <PencilLine />
                </Link>
              </Button>
            )}
          </div>
          <div className=" mt-[20px]  flex flex-col gap-5">
            <div className=" py-[15px] rounded-[12px] px-[15px] flex gap-3 items-center bg-secondary ">
              <div className=" rounded-[12px] flex items-center justify-center w-[60px] h-[60px] bg-[#E1EFFE] text-[#1A56DB]">
                <FaTicketSimple className=" w-[25px] h-[25px]" />
              </div>
              <div className="">
                <p>{formatWithCommas(tickets?.total ?? 0)}</p>
                <p className=" text-accent">Total tickets</p>
              </div>
            </div>
            <div className=" py-[15px] rounded-[12px] px-[15px] flex gap-3 items-center bg-secondary ">
              <div className=" rounded-[12px] flex items-center justify-center w-[60px] h-[60px] bg-[#DEF7EC] text-[#046C4E]">
                <FaBagShopping className=" w-[25px] h-[25px]" />
              </div>
              <div className="">
                <p>{formatWithCommas(tickets?.paid ?? 0)}</p>
                <p className=" text-accent">Paid tickets</p>
              </div>
            </div>
            <div className=" py-[15px] rounded-[12px] px-[15px] flex gap-3 items-center bg-secondary ">
              <div className=" rounded-[12px] flex items-center justify-center w-[60px] h-[60px] bg-[#edbfb1] text-[#E63F0C]">
                <MdFreeBreakfast className=" w-[25px] h-[25px]" />
              </div>
              <div className="">
                <p>{formatWithCommas(tickets?.free ?? 0)}</p>
                <p className=" text-accent">Free tickets</p>
              </div>
            </div>
            <div className=" py-[15px] rounded-[12px] px-[15px] flex gap-3 items-center bg-secondary ">
              <div className=" rounded-[12px] flex items-center justify-center w-[60px] h-[60px] bg-[#FDF6B2] text-[#8E4B10]">
                <FaHourglass className=" w-[25px] h-[25px]" />
              </div>
              <div className="">
                <p>{formatWithCommas(tickets?.available ?? 0)}</p>
                <p className=" text-accent">Pending tickets</p>
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-[20px]">
          <p className=" text-[24px]">Attendees</p>
          <>
            {data?.attendees.length !== 0 ? (
              <div className=" mt-[5px] flex  flex-col">
                {data?.attendees.map((attendee, k) => (
                  <div
                    key={k}
                    className=" border border-accent/25 border-l-0 py-[15px] px-[20px] border-t-0 border-r-0 flex gap-3 items-center"
                  >
                    <Image
                      className=" rounded-full"
                      src={attendee.image ?? "/no-profile.png"}
                      alt=""
                      width={"32"}
                      height={"32"}
                    />
                    <p className=" capitalize text-[16px]">{attendee.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className=" mt-[10px] text-accent">
                No attendees yet, check this space later for an update.
              </p>
            )}
          </>
        </div>

        {today < eventEndDate && today < eventStartDate && (
          <div className="">
            <Button className=" mt-[30px] flex flex-row items-center w-full rounded-[12px] font-semibold py-[24px]">
              Close Registration
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
