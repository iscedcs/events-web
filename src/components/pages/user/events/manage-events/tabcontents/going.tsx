"use client";

import EventCard from "@/components/shared/event/event-card";
import EventCardSkeleton from "@/components/skeletons/event-card";
import EventCalendar from "@/components/ui/secondary/event-calendar";
import { SingleTicketProps } from "@/lib/types/event";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getTicketByUserID } from "../../../../../../../actions/tickets";
import EmptyState from "../empty-state";

export default function Going() {
  const [tickets, setTickets] = useState<SingleTicketProps[]>([]);
  const [loading, setLoading] = useState(true);
  const session = useSession();
  const userID = session.data?.user.id;

  useEffect(() => {
    if (!userID) return;

    let cancelled = false;

    const fetchEvents = async () => {
      setLoading(true);
      try {
        const ticketsData = await getTicketByUserID(userID);
        if (!cancelled) setTickets(ticketsData ?? []);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchEvents();

    return () => {
      cancelled = true;
    };
  }, [userID]);

  // console.log({ tickets });

  if (!loading && tickets.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className=" px-[10px] absolute top-0 right-0">
        <EventCalendar eventType="going" type="multiple" />
      </div>

      {loading ? (
        <div className=" mt-[20px]">
          <EventCardSkeleton />
        </div>
      ) : (
        <div className=" grid-cols-1 grid gap-[30px] mt-[20px] ">
          {tickets.map((ticket) => (
            <div key={ticket.id}>
              <EventCard
                title={ticket.event?.title ?? ""}
                image={ticket.event?.image ?? ""}
                time={ticket.event?.time ?? ""}
                host={ticket.event?.host ?? ""}
                startDate={ticket.event?.startDate ?? new Date()}
                id={ticket.id}
                link={`/user/events/${ticket.event?.cleanName.toLowerCase()}/ticket/{
                  ticket.id
                }`}
                cardType="going"
              />
              <hr className=" mt-[25px]" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
