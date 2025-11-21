import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";

export default function NearbyEventCard({
  startDate,
  time,
  title,
  location,
  host,
  image,
  cleanName,
}: {
  startDate: Date;
  time: string;
  title: string;
  location: string;
  host: string;
  image: string;
  cleanName: string;
}) {
  return (
    <Link
      href={`events/${cleanName.toLowerCase()}`}
      className=" flex  w-full items-start gap-3"
    >
      <div className=" w-full">
        <span className=" flex gap-2">
          <p>{format(startDate, "LLLL d")}</p>
          <p className=" text-accent">Saturday</p>
        </span>
        <div className=" py-[20px] px-[20px] mt-[10px] rounded-[20px] w-full bg-secondary">
          <div className=" flex flex-row gap-2 justify-between items-center">
            <div className="">
              <p className=" text-accent">{time}</p>
              <p className=" capitalize W-[20%] line-clamp-2">
                {title.toLowerCase()}
              </p>
              <span className=" mt-[10px] text-[14px]  flex items-center gap-2">
                <FaUserCircle className=" w-[18px] h-[18px]" />
                <p className="text-accent">{host}</p>
              </span>
              <span className=" mt-[10px] text-[14px]  flex items-center gap-2">
                <MdLocationPin className=" w-[18px] h-[18px]" />
                <p className=" capitalize  w-[80%] text-accent line-clamp-2">
                  {location.toLowerCase()}
                </p>
              </span>
            </div>
            <Image
              src={
                image?.startsWith("http") || image?.startsWith("/")
                  ? image
                  : "/no-image.png"
              }
              alt="image"
              width={"1000"}
              height={"1000"}
              className=" w-[90px] h-[90px] object-cover rounded-[20px]"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
