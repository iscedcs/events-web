import EventCard from "@/components/shared/event/event-card";
import EventCalendar from "@/components/ui/secondary/event-calendar";

export default function Hosting() {
  return (
    <>
      <div className=" px-[10px] absolute top-0 right-0">
        <EventCalendar eventType="hosting" type="multiple" />
      </div>
      <div className=" mt-[20px] ">
        <EventCard id="" link="" cardType="hosting" />
      </div>
    </>
  );
}
