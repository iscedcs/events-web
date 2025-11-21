"use client";

import EventCard from "@/components/shared/event/event-card";
import EventCardSkeleton from "@/components/skeletons/event-card";
import EventCalendar from "@/components/ui/secondary/event-calendar";
import { useEffect, useState } from "react";
import { getPastTicketsByUserID } from "../../../../../../../actions/tickets";
import EmptyState from "../empty-state";
import { SingleTicketProps } from "@/lib/types/ticket";

export default function Past({ userId }: { userId?: string }) {
  const [pastTicket, setPastTicket] = useState<SingleTicketProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const ticketData = await getPastTicketsByUserID(userId!);
        setPastTicket(ticketData ?? []);
      } finally {
        setLoading(false);
      }
    };

    fetchPastEvents();
  }, [userId]);

  return (
    <>
      <div className=" px-[10px] absolute top-0 right-0">
        <EventCalendar eventType="past" type="multiple" />
      </div>

      {loading && (
        <div className=" mt-[20px]">
          <EventCardSkeleton />
        </div>
      )}

      {!loading && pastTicket.length === 0 && <EmptyState />}

      {!loading && pastTicket.length > 0 && (
        <div className=" grid-cols-1 grid gap-[30px] mt-[20px] ">
          {pastTicket.map((ticket) => (
            <div key={ticket.id}>
              <EventCard
                endDate={ticket.event?.endDate ?? new Date()}
                host={ticket.event?.host ?? ""}
                image={ticket.event?.image ?? ""}
                startDate={ticket.event?.startDate ?? new Date()}
                time={ticket.event?.time ?? ""}
                title={ticket.event?.title ?? ""}
                id={ticket.id}
                link={`/user/events/${ticket.event?.cleanName.toLowerCase()}/ticket/${
                  ticket.id
                }`}
                cardType="past"
              />
              <hr className=" mt-[25px]" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
