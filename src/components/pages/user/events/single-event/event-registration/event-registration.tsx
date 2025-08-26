import SingleDayDisplay from "@/components/ui/secondary/single-day-display";
import { SingleEventProps } from "@/lib/types/event";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { MdOutlineArrowOutward, MdOutlineChat } from "react-icons/md";
import { PiMapPinFill } from "react-icons/pi";
import { checkEventAttendee } from "../../../../../../../actions/attendee";
import { getEventsByCleanName } from "../../../../../../../actions/events";
import { checkWatchList } from "../../../../../../../actions/watchlist";
import { auth } from "../../../../../../../auth";
import BookmarkButton from "./bookmark-button";
import EventRegistrationCTA from "./event-registration-cta";
import ViewTicket from "./view-ticket";

export default async function EventRegistration({ slug }: { slug: string }) {
  const event: SingleEventProps = await getEventsByCleanName(slug ?? "");
  const session = await auth();
  const userId = session?.user.id ?? "";

  console.log({ userId });

  const check = await checkEventAttendee(userId, slug);
  const ticketId =
    event.attendees.find((attendee) => attendee.userId === userId)?.ticketId ??
    "";
  const watchListCheck: boolean = await checkWatchList(event.id);

  console.log({ ticketId });

  console.log({ watchListCheck });

  console.log(event.id);
  return (
    <div className=" ">
      {check?.check && (
        <Link
          href={""}
          className=" flex gap-4 items-center bg-secondary mt-[56px] py-[10px]  px-[10px] "
        >
          <div className="">
            <Image
              src={
                event.image?.startsWith("http") || event.image?.startsWith("/")
                  ? event.image
                  : "/no-image.jpg"
              }
              alt="image"
              width={"1000"}
              height={"1000"}
              className=" w-[48px] border border-white h-[48px] rounded-full object-cover"
            />
          </div>
          <div className="">
            <p className=" text-[16px] font-medium">Event Chat</p>
            <p className=" text-accent text-[12px]">
              Join others and participate in event discussions.
            </p>
          </div>
          <div className="">
            <MdOutlineChat className=" w-[20px] h-[20px]" />
          </div>
        </Link>
      )}
      <div className=" px-[10px] ">
        <div className="">
          {!check?.check && (
            <div className=" flex mt-[70px] justify-between flex-row w-full">
              <div className="">
                <Link
                  className=" text-[12px]  flex gap-2 items-center"
                  href={""}
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

        <div className=" mt-[20px]">
          <Image
            src={
              event.image?.startsWith("http") || event.image?.startsWith("/")
                ? event.image
                : "/no-image.jpg"
            }
            alt="image"
            width={"1000"}
            height={"1000"}
            className=" w-full h-[300px] rounded-[24px] object-cover"
          />
          <div className=" mt-[10px] flex items-center gap-2">
            <div className=" animate-caret-blink bg-white w-[8px] h-[8px] "></div>
            <p className=" text-[10px]">Registration on-going</p>
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
                  <p className=" text-[14px]">{event.host ?? "No host name"}</p>
                </div>
              </div>
              <div className=" flex gap-2">
                <Link href={""}>
                  <AiFillInstagram />
                </Link>
                <Link href="">
                  <BsGlobe />
                </Link>
                <Link href={""}>
                  <IoLogoLinkedin />
                </Link>
              </div>
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
            <div className=" flex items-center gap-2 mt-[10px]">
              <div className=" bg-secondary flex items-center justify-center w-[40px] border-accent h-[40px] border rounded-[12px] ">
                <PiMapPinFill className=" w-[20px] h-[20px]" />
              </div>
              <div className="">
                <p className=" text-[16px] capitalize">
                  {event.location.toLowerCase()}
                </p>
                <p className=" text-[14px] capitalize">
                  {event.town.toLowerCase()}
                </p>
              </div>
            </div>
            {check?.check ? (
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
                  <Image
                    src={"/dummy-images/map.png"}
                    alt="map"
                    width={"1000"}
                    height={"1000"}
                    className=" rounded-[12px]"
                  />
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
  );
}
