import Categories from "./categories";
import EventSearch from "./event-search";
import EventsNearYou from "./section-type/events-near-you";
import FeaturedCalendar from "./section-type/featured-calendar";
import TrendingEvents from "./section-type/trending-events";
import UpcomingEvent from "./section-type/upcoming-event";

export default function Discover() {
  return (
    <div className=" px-[10px]">
      <div className=" ">
        <div className=" flex mt-[20px] items-center justify-between">
          <p className=" text-[24px]">Categories</p>
          <EventSearch />
        </div>
        <div className=" mt-[20px]">
          <Categories />
        </div>
      </div>
      <UpcomingEvent />
      <TrendingEvents />
      <FeaturedCalendar />
      <EventsNearYou />
    </div>
  );
}
