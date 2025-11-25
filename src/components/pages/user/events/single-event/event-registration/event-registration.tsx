import EventChatButton from "@/components/shared/event/event-chat-button";
import SingleDayDisplay from "@/components/ui/secondary/single-day-display";
import { SingleEventProps } from "@/lib/types/event";
import { stripTime } from "@/lib/utils";
import { format, isAfter, isBefore, isEqual } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";
import { PiMapPinFill } from "react-icons/pi";
import { checkEventAttendee } from "../../../../../../../actions/attendee";
import { getCurrentUser } from "../../../../../../../actions/auth";
import { getEventsByCleanName } from "../../../../../../../actions/events";
import { checkWatchList } from "../../../../../../../actions/watchlists";
import BookmarkButton from "../../../../../ui/secondary/bookmark-button";
import ClosedRegistration from "./closed-registration";
import EventMapLocation from "./event-map-location";
import EventRegistrationCTA from "./event-registration-cta";
import ViewTicket from "./view-ticket";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function EventRegistration({ slug }: { slug: string }) {
  const event: SingleEventProps = await getEventsByCleanName(slug ?? "");
  const me = await getCurrentUser();
  const userId = me?.id ?? "";

  // console.log({ userId });

  const check = await checkEventAttendee(userId, slug);

  const now = stripTime(new Date());
  const startDate = stripTime(new Date(event?.startDate ?? now));
  const endDate = stripTime(new Date(event?.endDate ?? now));

  // console.log({ check });

  const ticketId =
    event.attendees.find((attendee) => attendee.userId === userId)?.ticketId ??
    "";
  const watchListCheck: boolean = await checkWatchList(event.id);

  // console.log({ ticketId });

  // console.log({ watchListCheck });

  // console.log(event.id);

  // console.log({
  //   EndDate: endDate,
  //   StartDate: startDate,
  // });

  return (
    <div className=" relative">
      <Image
        src={"/background-screen.gif"}
        alt="image"
        width={"1000"}
        height={"1000"}
        unoptimized
        className=" relative w-screen h-screen object-cover"
      />
      <div className=" absolute top-0 h-screen left-0 w-full z-40 bg-[#000000e7] ">
        <ScrollArea className=" h-[100svh]">
          <div className=" ">
            {check?.check && isBefore(now, endDate) && (
              <EventChatButton event={event} />
            )}
            <div className=" px-[10px] ">
              <div className="">
                {!check?.check && (
                  <div className=" flex mt-[70px] justify-between flex-row w-full">
                    <div className="">
                      <Link
                        className=" text-[12px]  flex gap-2 items-center"
                        href={"/user/events?tab=create"}
                      >
                        Host your event
                        <MdOutlineArrowOutward />
                      </Link>
                    </div>
                    <div className="">
                      <BookmarkButton
                        eventDate={event.startDate}
                        isClicked={watchListCheck ?? false}
                        eventId={event.id}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div
                className={`${
                  isEqual(now, startDate) || isBefore(now, endDate)
                    ? "mt-[20px]"
                    : " mt-[70px]"
                }`}
              >
                <Image
                  src={
                    event.image?.startsWith("http") ||
                    event.image?.startsWith("/")
                      ? event.image
                      : "/no-image.png"
                  }
                  alt="image"
                  width={"1000"}
                  height={"1000"}
                  className=" w-full h-[300px] rounded-[24px] object-cover"
                />
                <div className=" mt-[10px] flex items-center gap-2">
                  <div
                    className={` ${
                      isAfter(now, startDate) || isAfter(now, endDate)
                        ? " bg-error"
                        : "animate-caret-blink bg-white"
                    }  w-[8px] h-[8px]`}
                  ></div>
                  {isAfter(now, startDate) || isAfter(now, endDate) ? (
                    <p className=" text-error text-[10px]">
                      Registration closed
                    </p>
                  ) : (
                    <p className=" text-[10px]">Registration on-going</p>
                  )}
                </div>
                <div className=" mt-[10px]   ">
                  <p className="text-[24px] capitalize">
                    {event.title.toLowerCase()}
                  </p>
                  <div className=" flex justify-between items-center">
                    <div className=" flex mt-[10px] items-center gap-3">
                      <FaUserCircle className=" w-[30px] h-[30px]" />
                      <div className="">
                        <p className=" text-[10px] text-accent">Presented by</p>
                        <p className=" text-[14px]">
                          {event.host ?? "No host name"}
                        </p>
                      </div>
                    </div>
                    {/* <div className=" flex gap-2">
                      <Link href={""}>
                        <AiFillInstagram />
                      </Link>
                      <Link href="">
                        <BsGlobe />
                      </Link>
                      <Link href={""}>
                        <IoLogoLinkedin />
                      </Link>
                    </div> */}
                  </div>
                  <div className=" flex items-center gap-2 mt-[20px]">
                    <SingleDayDisplay date={event.startDate} />
                    <div className="">
                      <p className=" text-[16px]">
                        {format(event.startDate, "iiii, LLLL d")}
                      </p>
                      <p className=" text-[14px]">
                        {event.time ?? "No time provided"}
                      </p>
                    </div>
                  </div>
                  <div className="  flex items-center gap-2 mt-[10px]">
                    <div className=" bg-secondary flex items-center justify-center w-[40px] border-accent h-[40px] border rounded-[12px] ">
                      <PiMapPinFill className=" w-[20px] h-[20px]" />
                    </div>
                    <div className="  w-[80%]">
                      <p className=" line-clamp-2 text-[16px] capitalize">
                        {event.location.toLowerCase()}
                      </p>
                      <p className=" text-accent text-[14px] capitalize">
                        {event.town.toLowerCase()}
                      </p>
                    </div>
                  </div>
                  {isAfter(now, startDate) || isAfter(now, endDate) ? (
                    <ClosedRegistration />
                  ) : check?.check ? (
                    <ViewTicket slug={slug} ticketId={ticketId} />
                  ) : (
                    <EventRegistrationCTA slug={slug} />
                  )}

                  <div className=" mt-[10px]">
                    <p className=" py-[20px]">About Event</p>
                    <hr className=" h-[0.5px]" />
                    <div className=" py-[20px]">
                      <p className=" text-[16px]">
                        {event.description ?? "No description provided"}
                      </p>
                    </div>
                    <p className=" py-[20px]">Location</p>
                    <hr className=" h-[0.5px]" />
                    <div className=" py-[20px]">
                      <p className=" capitalize text-[16px]">
                        {event.location.toLowerCase()}
                      </p>
                      <p className=" text-[12px] capitalize">
                        {event.town.toLowerCase()}
                      </p>
                      <div className=" mt-[10px]">
                        <EventMapLocation event={event} />
                      </div>
                      <div className=" mt-[30px]">
                        <Link href={""} className=" underline">
                          Report Event
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
