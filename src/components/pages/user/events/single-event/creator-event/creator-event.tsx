import EventChatButton from "@/components/shared/event/event-chat-button";
import { Button } from "@/components/ui/button";
import { formatWithCommas } from "@/lib/utils";
import { isAfter, isBefore, isEqual, isSameDay } from "date-fns";
import { format } from "date-fns/format";
import { PencilLine, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaBagShopping, FaHourglass, FaTicketSimple } from "react-icons/fa6";
import { MdFreeBreakfast } from "react-icons/md";
import {
  getEventsByID,
  getEventWithTenAttendeesByCleanName,
} from "../../../../../../../actions/events";
import { getTicketsByEventID } from "../../../../../../../actions/tickets";
import CloseRegistration from "./close-registration";
import DeleteEvent from "./delete-event";
import ShareButton from "./share-button";
import { SingleEventProps } from "@/lib/types/event";

export default async function CreatorEvent({ slug }: { slug: string }) {
  const formattedProps = encodeURIComponent(slug);
  const data = await getEventWithTenAttendeesByCleanName(formattedProps ?? "");
  const extraInfo: SingleEventProps = await getEventsByID(data?.event.id);
  const tickets = await getTicketsByEventID(data?.event.id);
  const today = new Date();
  const eventStartDate = new Date(data?.event?.startDate);
  const eventEndDate = new Date(data?.event?.endDate);
  const currentTime = format(new Date(), "p");
  const eventTime = data?.event.time;
  var message = "";
  var isToday;

  // console.log({ eventStartDate });
  // console.log({ eventEndDate });
  // console.log("Event time", data?.event.time);

  // console.log("Current time", format(new Date(), "p"));

  const isTime = currentTime === eventTime;

  // console.log(isTime);

  switch (true) {
    case isBefore(today, eventStartDate) &&
      isBefore(today, eventEndDate) &&
      !isTime:
      message = `Event is not today`;
      isToday = false;
      break;
    case isAfter(eventEndDate, today) || isSameDay(eventEndDate, today):
      message = "Event is over";
      isToday = false;
      break;
    case isAfter(today, eventStartDate) && isBefore(today, eventEndDate):
      message = `Event is ongoing`;
      isToday = false;
      break;
    default:
      message = "Event is today";
      isToday = true;
      break;
  }

  return (
    <>
      {isBefore(today, eventEndDate) && <EventChatButton event={data?.event} />}
      <div
        className={`
        ${
          isBefore(today, eventEndDate) ? " py-[20px]" : " pt-[70px]"
        } px-[10px]`}
      >
        <div className="">
          <p className=" text-[24px] font-extrabold capitalize ">
            {data?.event?.title?.toLowerCase() ?? ""}
          </p>
          <p className=" text-[16px]">
            {message}, {format(data?.event?.startDate ?? new Date(), "PPPP")}
          </p>
          {(isAfter(eventEndDate, today) || isSameDay(eventEndDate, today)) && (
            <p className=" text-[15px] text-error">
              End Time: {format(data?.event?.endDate ?? new Date(), "PPPP")}
            </p>
          )}
          {data?.event?.time && (
            <p className=" text-accent text-[14px]">
              {data?.event?.time} GMT +1
            </p>
          )}
        </div>
        {!extraInfo.isPublic && (
          <div className=" rounded-[20px] px-[20px] py-[20px] my-[20px] bg-secondary">
            <p className=" text-[20px] font-bold">Private event</p>
            <p className=" text-accent">
              This event is a private event, share event link to get more
              attendees
            </p>
            <ShareButton
              eventTitle={data?.event.title}
              text="Check this event out!!"
            />
          </div>
        )}
        {(isSameDay(today, eventStartDate) ||
          (!isAfter(eventEndDate, today) && isTime)) && (
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
        )}

        <div className="">
          <div className=" flex mt-[20px] items-center justify-between">
            <p className=" text-[24px]">Tickets</p>
            {isSameDay(today, eventStartDate) ||
              (isBefore(today, eventStartDate) && (
                <Button asChild>
                  <Link
                    href={`/user/events/${data?.event.cleanName.toLowerCase()}/edit`}
                  >
                    Edit event
                    <PencilLine />
                  </Link>
                </Button>
              ))}
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
                      className=" w-[32px] h-[32px] object-cover rounded-full"
                      src={attendee.image ?? "/no-profile.jpg"}
                      alt=""
                      width={"32"}
                      height={"32"}
                    />
                    <p className=" capitalize text-[16px]">{attendee.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className=" mt-[10px] pb-[20px] text-accent">
                No attendees yet, check this space later for an update.
              </p>
            )}
          </>
        </div>

        <CloseRegistration />
        {(isEqual(today, eventStartDate) || isBefore(today, eventEndDate)) && (
          <div className=" pb-[24px]">
            <DeleteEvent id={data?.event.id} />
          </div>
        )}
      </div>
    </>
  );
}
