import EventCalendar from "@/components/ui/secondary/event-calendar";
import StandaloneCurrentMonthCalendar from "@/components/ui/secondary/standalone-event-calendat";

export default function FeaturedCalendar() {
	return (
		<div className="  w-full mt-[40px]">
			<div className="">
				<p className="text-[24px]">Featured Calendar</p>
			</div>
			<div className=" mt-[10px]">
				{/* <EventCalendar eventType="featured" type="single" isOpen={false} /> */}
				<StandaloneCurrentMonthCalendar />
			</div>
		</div>
	);
}
