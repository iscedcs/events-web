"use client";

import { Button } from "@/components/ui/button";
import BookmarkButton from "@/components/ui/secondary/bookmark-button";
import { EventCardProps } from "@/lib/types/event";
import { format, isAfter, isBefore, isSameDay } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default function EventCard({
  id,
  cardType,
  link,
  title,
  isClicked,
  image,
  time,
  host,
  showBookmarkButton,
  endDate,
  startDate,
}: EventCardProps) {
  const today = new Date();
  const eventStartDate = new Date(startDate);
  const eventEndDate = new Date(endDate);

  // console.log({ startDate: new Date(startDate), today });

  return (
    <>
      <Link href={link} className="">
        <div className=" flex items-center justify-between">
          <div className=" flex flex-col">
            <div className=" flex gap-2 items-start">
              <p className="text-[48px] leading-[35px] font-extrabold">
                {format(startDate, "d")}
              </p>
              <p className=" text-[14px]"> {format(startDate, "LLL")}</p>
            </div>
            <p className=" mt-[10px] text-[18px]">{time} WAT</p>
          </div>
          {cardType === "going" ? (
            <div className="">
              <Button asChild>
                <p>My ticket</p>
              </Button>
            </div>
          ) : cardType === "hosting" ? (
            <div className="">
              <Button asChild>
                <p>Details</p>
              </Button>
            </div>
          ) : cardType === "interested" || cardType === "public" ? (
            <div className="">
              <Button asChild>
                <p>Event Details</p>
              </Button>
            </div>
          ) : cardType === "past" ? (
            <div className="">
              <p className=" text-[14px] underline">Past events</p>
            </div>
          ) : null}
        </div>
        <div className=" relative mt-[10px]">
          <Image
            src={
              image?.startsWith("http") || image?.startsWith("/")
                ? image
                : "/resources/no-image.png"
            }
            alt="image"
            width={"1000"}
            height={"1000"}
            className=" w-full h-[300px] rounded-[24px] object-cover "
          />
          {cardType === "interested" && showBookmarkButton && (
            <div className=" p-[10px] rounded-full bg-[#0000008f] right-0 bottom-0 mr-[20px] mb-[20px] absolute">
              <BookmarkButton
                eventDate={new Date(startDate)}
                eventId={id ?? ""}
                isClicked={isClicked ?? false}
              />
            </div>
          )}
        </div>
        {cardType !== "public" && (
          <div className="mt-[10px] flex items-center gap-2">
            <div className="animate-caret-blink w-[8px] h-[8px] bg-white"></div>
            <p className="text-[10px]">
              {(() => {
                if (cardType === "going") {
                  return "Going for this event";
                }

                if (cardType === "hosting") {
                  if (isBefore(today, eventStartDate)) {
                    return "You are hosting this event";
                  } else if (
                    isSameDay(eventStartDate, today) ||
                    (isAfter(today, eventStartDate) &&
                      isBefore(today, eventEndDate))
                  ) {
                    return "You are hosting this event";
                  } else if (isAfter(today, eventEndDate)) {
                    return "You hosted this event";
                  }
                }

                if (cardType === "past") {
                  return "You already attended this event.";
                }

                if (cardType === "interested") {
                  return "Bookmarked this event";
                }

                return "";
              })()}
            </p>
          </div>
        )}
        <div className=" mt-[10px]">
          <p className=" capitalize text-[24px]">{title.toLowerCase()}</p>
        </div>
        <div className=" flex justify-between items-center">
          <div className=" flex mt-[10px] items-center gap-3">
            <FaUserCircle className=" w-[30px] h-[30px]" />
            <div className="">
              <p className=" text-[10px] text-accent">Presented by</p>
              <p className=" text-[14px]">{host ?? "No host name"}</p>
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
      </Link>
    </>
  );
}
