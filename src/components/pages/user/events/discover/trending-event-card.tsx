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
    <Link className="  flex items-center gap-3" href={path}>
      <div className="">
        <Image
          alt="image"
          className="w-[90px] rounded-[20px] h-[90px] object-cover "
          src={image}
          width={"1000"}
          height={"1000"}
        />
      </div>
      <div className=" text-[16px]">
        <p>{title}</p>
        <p className=" text-accent">{day.toDateString()}</p>
        <p className=" text-accent">{location}</p>
      </div>
    </Link>
  );
}
