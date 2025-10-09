"use client";

import { Button } from "@/components/ui/button";
import BookmarkButton from "@/components/ui/secondary/bookmark-button";
import { EventCardProps } from "@/lib/types/event";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";

export default function EventCard({
  id,
  cardType,
  link,
  title,
  isClicked,
  image,
  time,
  host,
  startDate,
}: EventCardProps) {
  return (
    <>
      <div className="">
        <div className=" flex items-center justify-between">
          <div className=" flex flex-col">
            <div className=" flex gap-2 items-start">
              <p className="text-[48px] leading-[35px] font-extrabold">
                {format(startDate, "d")}
              </p>
              <p className=" text-[14px]"> {format(startDate, "LLL")}</p>
            </div>
            {(time || time) && (
              <p className=" mt-[10px] text-[18px]">
                {cardType === "going" || cardType === "past"
                  ? time
                  : cardType === "interested"
                  ? time
                  : null}{" "}
                WAT
              </p>
            )}
          </div>
          {cardType === "going" ? (
            <div className="">
              <Button asChild>
                <Link href={link}>My ticket</Link>
              </Button>
            </div>
          ) : cardType === "hosting" ? (
            <div className="">
              <Button asChild>
                <Link href={link}>My event</Link>
              </Button>
            </div>
          ) : cardType === "interested" ? (
            <div className="">
              <Button asChild>
                <Link href={link}>Event Details</Link>
              </Button>
            </div>
          ) : cardType === "past" ? (
            <div className="">
              <Link className=" text-[14px] underline" href={link}>
                Past events
              </Link>
            </div>
          ) : null}
        </div>
        <div className=" relative mt-[10px]">
          <Image
            src={
              cardType === "going" || cardType === "past"
                ? image?.startsWith("http") || image?.startsWith("/")
                  ? image
                  : "/no-image.jpg"
                : cardType === "interested"
                ? image?.startsWith("http") || image?.startsWith("/")
                  ? image
                  : "/no-image.jpg"
                : ""
            }
            alt="image"
            width={"1000"}
            height={"1000"}
            className=" w-full h-[300px] rounded-[24px] object-cover "
          />
          {cardType === "interested" && (
            <div className=" p-[10px] rounded-full bg-[#0000008f] right-0 bottom-0 mr-[20px] mb-[20px] absolute">
              <BookmarkButton
                eventDate={new Date(startDate)}
                eventId={id ?? ""}
                isClicked={isClicked ?? false}
              />
            </div>
          )}
        </div>
        <div className=" mt-[10px] flex items-center gap-2">
          <div className=" animate-caret-blink w-[8px] h-[8px] bg-white"></div>
          <p className=" text-[10px]">
            {cardType === "going"
              ? "Going for this event"
              : cardType === "hosting"
              ? "You are hosting this event"
              : cardType === "past"
              ? "You already attended this event."
              : cardType === "interested"
              ? "Bookmarked this event"
              : ""}
          </p>
        </div>
        <div className=" mt-[10px]">
          <p className=" capitalize text-[24px]">
            {cardType === "going" || cardType === "past"
              ? title.toLowerCase()
              : cardType === "interested"
              ? title.toLowerCase()
              : ""}
          </p>
        </div>
        <div className=" flex justify-between items-center">
          <div className=" flex mt-[10px] items-center gap-3">
            <FaUserCircle className=" w-[30px] h-[30px]" />
            <div className="">
              <p className=" text-[10px] text-accent">Presented by</p>
              <p className=" text-[14px]">
                {cardType === "going" || cardType === "past"
                  ? host ?? "No host name"
                  : cardType === "interested"
                  ? host ?? "No host name"
                  : null}
              </p>
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
      </div>
    </>
  );
}
