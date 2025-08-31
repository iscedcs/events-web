"use client";

import EventCard from "@/components/shared/event/event-card";
import EventCardSkeleton from "@/components/skeletons/event-card";
import EventCalendar from "@/components/ui/secondary/event-calendar";
import { SingleTicketProps } from "@/lib/types/event";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getPastTicketsByUserID } from "../../../../../../../actions/tickets";
import EmptyState from "../empty-state";

export default function Past() {
  const [pastTicket, setPastTicket] = useState<SingleTicketProps[]>([]);
  const [loading, setLoading] = useState(true);
  const session = useSession();
  const userID = session.data?.user.id;

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const ticketData = await getPastTicketsByUserID(userID ?? "");
        setPastTicket(ticketData ?? []);
      } finally {
        setLoading(false);
      }
    };

    if (userID) fetchPastEvents();
  }, [userID]);

  if (!loading && pastTicket.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className=" px-[10px] absolute top-0 right-0">
        <EventCalendar eventType="past" type="multiple" />
      </div>

      {loading ? (
        <div className=" mt-[20px]">
          <EventCardSkeleton />
        </div>
      ) : (
        <div className=" grid-cols-1 grid gap-[30px] mt-[20px] ">
          {pastTicket.map((ticket) => (
            <div key={ticket.id}>
              <EventCard
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
