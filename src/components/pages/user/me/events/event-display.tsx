"use client";

import React, { useEffect, useState } from "react";
import SingleEventCard from "./single-event-card";
import { SingleEventProps } from "@/lib/types/event";
import { getUserEVents } from "../../../../../../actions/events";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import SingleEventCardSkeleton from "@/components/skeletons/single-event-card";

export default function EventDisplay() {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<SingleEventProps[]>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const data = await getUserEVents({});
        if (data) {
          setLoading(false);
          setEvent(data.events as SingleEventProps[]);
        } else {
          setLoading(false);
        }
      } catch (e: any) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

  //   console.log({ event });

  return (
    <div>
      {loading ? (
        <SingleEventCardSkeleton />
      ) : (
        <>
          {event.length === 0 || event === null ? (
            <div className=" mt-[50px] flex items-center justify-center flex-col text-accent gap-2">
              <CalendarDays className=" w-[100px] h-[100px]" />
              <p>You do not have any event yet</p>
              <Button>Host an event</Button>
            </div>
          ) : (
            <div className=" flex pb-[20px] gap-3 flex-col">
              {event.map((item) => {
                return (
                  <SingleEventCard
                    location={item.location}
                    key={item.id}
                    attendeeNumber={item.attendees.length.toString() ?? 0}
                    cleanName={item.cleanName}
                    image={item.image}
                    startDate={item.startDate}
                    ticketNumer={item.tickets?.length.toString() ?? 0}
                    time={item.time}
                    title={item.title}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
