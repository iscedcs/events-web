import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DUMMYTRENDINGEVENTS } from "@/lib/const";
import TrendingEventCard from "../trending-event-card";

export default function TrendingEvents() {
  return (
    <div>
      <div className=" mt-[40px]">
        <div className=" flex items-center justify-between">
          <p className="text-[24px]">Trending Events</p>
          <Button>View all</Button>
        </div>
        <ScrollArea className=" mt-[20px]">
          <div className=" w-[900px] flex gap-4 flex-wrap flex-row">
            {DUMMYTRENDINGEVENTS.map((event, k) => (
              <TrendingEventCard
                key={k}
                day={event.day}
                image={event.image}
                location={event.location}
                path={event.path}
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
