import { Button } from "@/components/ui/button";
import SingleDayDisplay from "@/components/ui/secondary/single-day-display";
import { SingleEventProps } from "@/lib/types/event";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { HiTicket } from "react-icons/hi2";
import { IoLogoLinkedin } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";
import { PiMapPinFill } from "react-icons/pi";
import { getEventsByCleanName } from "../../../../../../actions/events";

export default async function EventRegistration({ slug }: { slug: string }) {
  const event: SingleEventProps = await getEventsByCleanName(slug ?? "");
  return (
    <div>
      <div className=" px-[10px] mt-[70px]">
        {/* <p>{slug}</p> */}
        <Link className=" text-[12px] flex gap-2 items-center" href={""}>
          Host your event
          <MdOutlineArrowOutward />
        </Link>
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
                  <p className=" text-[14px]">
                    Event admission is still ongoing
                  </p>
                  <p className=" text-[10px]">
                    If you’d like, you can still register.
                  </p>
                </div>
              </div>
              <hr className=" h-[0.5px]" />

              <div className=" px-[20px] flex gap-4 flex-col py-[15px]">
                <p className=" text-[14px]">
                  Please click on the button below to register for the event.
                  You will recieve an email notification for your entry
                </p>
                <Button
                  asChild
                  className=" rounded-[12px] py-[25px] font-semibold text-[16px]"
                >
                  <Link
                    href={`/user/events/${event.cleanName.toLowerCase()}/register`}
                  >
                    Register for event
                  </Link>
                </Button>
              </div>
            </div>
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
