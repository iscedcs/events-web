import EventCard from "@/components/shared/event/event-card";
import { SingleEventProps } from "@/lib/types/event";
import { getAllEvents } from "../../../../actions/events";

export default async function AvailableEvents() {
  const events: SingleEventProps[] | undefined | null = await getAllEvents({
    limit: 5,
    page: 1,
  });

  console.log({ events });
  return (
    <div>
      {events?.map((event) => (
        <EventCard
          key={event.id}
          cardType="interested"
          host={event.host}
          id={event.id}
          image={event.image}
          link={`/user/events/${event.cleanName.toLowerCase()}`}
          startDate={event.startDate}
          time={event.time}
          title={event.title}
        />
      ))}
    </div>
  );
}
