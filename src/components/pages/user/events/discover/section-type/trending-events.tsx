"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SingleEventProps } from "@/lib/types/event";
import { useEffect, useState } from "react";
import { getAllEvents } from "../../../../../../../actions/events";
import TrendingEventCard from "../trending-event-card";

export default function TrendingEvents() {
  const [event, setEvent] = useState<SingleEventProps[]>();

  useEffect(() => {
    const fetchEvent = async () => {
      const event: SingleEventProps[] | undefined | null = await getAllEvents({
        limit: 9,
        page: 1,
      });
      setEvent(event ?? []);
    };
    fetchEvent();
  }, []);

  // const event = await getAllEvents({ limit: 1, page: 1 });
  return (
    <div>
      <div className=" mt-[40px]">
        <div className=" flex items-center justify-between">
          <p className="text-[24px]">Trending Events</p>
          <Button>View all</Button>
        </div>
        <ScrollArea className=" mt-[20px]">
          <div className=" w-[900px] grid grid-cols-3 gap-4">
            {event?.map((event, k) => (
              <TrendingEventCard
                key={k}
                day={event?.startDate}
                image={`${event.image}`}
                location={event.location}
                path={event.cleanName.toLowerCase()}
                title={event.title}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
