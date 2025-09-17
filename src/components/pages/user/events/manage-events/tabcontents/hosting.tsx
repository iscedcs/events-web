import EventCalendar from "@/components/ui/secondary/event-calendar";
import EmptyState from "../empty-state";

export default function Hosting() {
  return (
    <>
      <div className=" px-[10px] absolute top-0 right-0">
        <EventCalendar eventType="hosting" type="multiple" />
      </div>
      <div className=" mt-[20px] ">
        <EmptyState />
        {/* <EventCard id="" link="" cardType="hosting" /> */}
      </div>
    </>
  );
}
