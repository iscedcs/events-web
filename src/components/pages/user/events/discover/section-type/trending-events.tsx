"use client";

import { TrendingEventsSkeleton } from "@/components/skeletons/trending-event";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SingleEventProps } from "@/lib/types/event";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getAllEvents,
  getTrendingEvents,
} from "../../../../../../../actions/events";
import TrendingEventCard from "../trending-event-card";

export default function TrendingEvents() {
  const [event, setEvent] = useState<SingleEventProps[]>();
  const [loading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getTrendingEvents();
      setEvent(event?.event ?? []);
      setIsLoading(false);
      if (event === undefined || event === null) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, []);

  // const event = await getAllEvents({ limit: 1, page: 1 });
  return (
    <div>
      {loading === true ? (
        <TrendingEventsSkeleton />
      ) : (
        <div className=" mt-[40px]">
          <div className=" flex items-center justify-between">
            <p className="text-[24px]">Trending Events</p>
            <Button
              onClick={() => {
                router.push("/user/events/all");
              }}
            >
              View all
            </Button>
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
      )}
    </div>
  );
}
