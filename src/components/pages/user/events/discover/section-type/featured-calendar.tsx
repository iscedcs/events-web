import EventCalendar from "@/components/ui/event-calendar";

export default function FeaturedCalendar() {
  return (
    <div className=" flex items-center justify-between w-full mt-[40px]">
      <div className="">
        <p className="text-[24px]">Featured Calendar</p>
      </div>
      <div className="">
        <EventCalendar type="single" isOpen={false} />
      </div>
    </div>
  );
}
