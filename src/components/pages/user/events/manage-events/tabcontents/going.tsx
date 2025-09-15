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
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const ticketsData = await getTicketByUserID(userID ?? "");
        setTickets(ticketsData ?? []);
      } finally {
        setLoading(false);
      }
    };

    if (userID) fetchEvents();
  }, [userID]);

  console.log({ tickets });

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
                id={ticket.id}
                link={`/user/events/${ticket.event?.cleanName.toLowerCase()}/ticket/${
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
