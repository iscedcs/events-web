import { SingleEventProps } from "@/lib/types/event";
import { getEventsByCleanName } from "../../../../../../actions/events";
import { format } from "date-fns/format";

export default async function CreatorEvent({ slug }: { slug: string }) {
  const formattedProps = encodeURIComponent(slug);
  const event: SingleEventProps = await getEventsByCleanName(
    formattedProps ?? ""
  );
  const today = new Date();
  const eventStartDate = new Date(event.startDate);
  const eventEndDate = new Date(event.endDate);
  var message = "";
  var isToday;
  switch (true) {
    case today < eventStartDate:
      message = `Event is not today`;
      isToday = false;
      break;
    case today > eventEndDate || today > eventStartDate:
      message = "Event is over";
      isToday = false;
      break;
    default:
      message = "Event is today";
      isToday = true;
      break;
  }
  return (
    <div>
      <div className=" px-[10px] mt-[70px]">
        <p className=" text-[24px] font-extrabold capitalize ">
          {event?.title.toLowerCase()}
        </p>
        <p className=" text-[16px]">
          {message}, {format(event.startDate, "PPPP")}
        </p>
        {event.time && (
          <p className=" text-accent text-[14px]">{event.time} GMT +1</p>
        )}
      </div>
    </div>
  );
}
