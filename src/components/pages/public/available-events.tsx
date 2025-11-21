import EventCard from "@/components/shared/event/event-card";
import { SingleEventProps } from "@/lib/types/event";
import { getAllEvents } from "../../../../actions/events";
import { CloudAlert } from "lucide-react";

export default async function AvailableEvents() {
  const events = await getAllEvents({
    limit: 8,
    page: 1,
  });

  // console.log({ events });
  return (
    <>
      {events?.totalRecords === 0 ? (
        <div className=" flex text-accent mt-[60px] justify-center items-center flex-col px-[10px]">
          <CloudAlert className=" w-[100px] h-[100px]" />
          <p>No available events yet</p>
        </div>
      ) : (
        <div className=" grid grid-cols-1 gap-6 p-3">
          {events?.event?.map((event) => (
            <div className=" flex flex-col gap-4" key={event.id}>
              <EventCard
                cardType="public"
                host={event.host}
                id={event.id}
                endDate={event.endDate}
                image={event.image}
                link={`/user/events/${event.cleanName.toLowerCase()}`}
                startDate={event.startDate}
                time={event.time}
                title={event.title}
                showBookmarkButton={false}
              />
              <hr />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
