import { TrendingEventsProps } from "@/lib/types/event";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function TrendingEventCard({
  day,
  image,
  location,
  path,
  title,
}: TrendingEventsProps) {
  return (
    <Link
      className=" flex w-full items-center align-middle flex-row gap-3"
      href={`/user/events/${path}`}
    >
      <div className=" w-[90px]   ">
        <Image
          alt="image"
          className=" w-[90px] rounded-[20px] h-[90px] object-cover"
          src={
            image?.startsWith("http") || image?.startsWith("/")
              ? image
              : "/no-image.jpg"
          }
          width={1000}
          height={1000}
        />
      </div>
      <div className=" w-[50%]  text-[16px]">
        <p className=" capitalize line-clamp-1">{title.toLowerCase()}</p>
        <p className=" text-accent">{format(day, "PPP")}</p>
        <p className=" line-clamp-1 capitalize text-accent">
          {location.toLowerCase()}
        </p>
      </div>
    </Link>
  );
}
