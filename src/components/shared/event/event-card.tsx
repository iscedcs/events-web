"use client";

import EventCardSkeleton from "@/components/skeletons/event-card";
import { Button } from "@/components/ui/button";
import BookmarkButton from "@/components/ui/secondary/bookmark-button";
import { SingleEventProps, SingleTicketProps } from "@/lib/types/event";
import { format, isValid } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { getEventsByID } from "../../../../actions/events";
import { getTicketByID } from "../../../../actions/tickets";

export default function EventCard({
  id,
  cardType,
  link,
}: {
  link: string;
  id: string;
  cardType: "going" | "hosting" | "interested" | "past";
}) {
  const [ticket, setTicket] = useState<SingleTicketProps>();
  // const [pastTicket, setPastTicket] = useState<SingleTicketProps>();
  const [event, setEvent] = useState<SingleEventProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      try {
        if (cardType === "going" || cardType === "past") {
          const ticketData = await getTicketByID(id);
          if (!cancelled) setTicket(ticketData);
        } else {
          const eventData = await getEventsByID(id);
          if (!cancelled) setEvent(eventData);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [id, cardType]);

  if (loading) return <EventCardSkeleton />;

  const startDate =
    cardType === "going" || cardType === "past"
      ? ticket?.event?.startDate
        ? new Date(ticket.event.startDate)
        : ""
      : cardType === "interested"
      ? event?.startDate
        ? new Date(event?.startDate)
        : ""
      : "";

  if (loading) return <EventCardSkeleton />;

  return (
    <>
      <div className="">
        <div className=" flex items-center justify-between">
          <div className=" flex flex-col">
            <div className=" flex gap-2 items-start">
              <p className="text-[48px] leading-[35px] font-extrabold">
                {startDate && isValid(startDate)
                  ? format(startDate, "d")
                  : "No date"}
              </p>
              <p className=" text-[14px]">
                {" "}
                {startDate && isValid(startDate)
                  ? format(startDate, "LLL")
                  : "No date"}
              </p>
            </div>
            {(ticket?.event?.time || event?.time) && (
              <p className=" mt-[10px] text-[18px]">
                {cardType === "going" || cardType === "past"
                  ? ticket?.event?.time
                  : cardType === "interested"
                  ? event?.time
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
          ) : cardType === "interested" ? null : cardType === "past" ? (
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
                ? ticket?.event?.image?.startsWith("http") ||
                  ticket?.event?.image?.startsWith("/")
                  ? ticket?.event?.image
                  : "/no-image.jpg"
                : cardType === "interested"
                ? event?.image?.startsWith("http") ||
                  event?.image?.startsWith("/")
                  ? event?.image
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
                eventId={event?.id ?? ""}
                isClicked
              />
            </div>
          )}
        </div>
        <div className=" mt-[10px] flex items-center gap-2">
          <div className=" animate-caret-blink w-[8px] h-[8px] bg-white"></div>
          <p className=" text-[10px]">
            {cardType === "going" || cardType === "interested"
              ? "Going for this event"
              : cardType === "hosting"
              ? "You are hosting this event"
              : cardType === "past"
              ? "You already attended this event."
              : ""}
          </p>
        </div>
        <div className=" mt-[10px]">
          <p className=" capitalize text-[24px]">
            {cardType === "going" || cardType === "past"
              ? ticket?.event?.title.toLowerCase()
              : cardType === "interested"
              ? event?.title.toLowerCase()
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
                  ? ticket?.event?.host ?? "No host name"
                  : cardType === "interested"
                  ? event?.host ?? "No host name"
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
