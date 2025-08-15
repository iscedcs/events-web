"use client";

import { Button } from "@/components/ui/button";
import { SingleEventProps } from "@/lib/types/event";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getMostRecentEvent } from "../../../../../../../actions/events";

export default function UpcomingEvent() {
  const [event, setEvent] = useState<SingleEventProps>();

  useEffect(() => {
    const fetchEvent = async () => {
      const event: SingleEventProps | undefined = await getMostRecentEvent({});
      setEvent(event);
    };
    fetchEvent();
  }, []);
  // console.log("TICKETS", event?.tickets);
  // console.log("GALLARIES", event?.galleries);
  return (
    <div>
      <div className="  mt-[40px]">
        <p className="text-[24px]">Upcoming Event</p>
        <div className=" mt-[10px] bg-secondary p-[20px] w-full rounded-[20px] ">
          {event === null ? (
            <div className=" flex items-center flex-col gap-3">
              <p>No Upcoming event yet</p>
              <Button asChild>
                <Link href={""}>Be the first to host an event</Link>
              </Button>
            </div>
          ) : (
            <Link
              href={`/user/events/${event?.cleanName.toLowerCase()}`}
              className=""
            >
              <Image
                alt="image"
                src={event?.image ?? "/no-image.jpg"}
                width={"1000"}
                height={"1000"}
                className=" w-[90px] h-[90px]  object-cover rounded-[20px]"
              />
              <div className=" text-[16px] mt-[10px]">
                <span className=" flex gap-2">
                  <p>{event?.tickets[0].title}</p> <p> - </p>{" "}
                  <p>
                    {event?.tickets[0].isFree === true
                      ? "FREE"
                      : event?.tickets[0].amount}
                  </p>
                </span>

                <p className=" normal-case text-accent">{event?.title}</p>
                <p className=" text-accent">{event?.location}</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
