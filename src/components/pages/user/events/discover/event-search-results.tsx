import { EventSearchItemProps } from "@/lib/types/event";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { PiMapPinFill } from "react-icons/pi";

export default function EventSearchResults({
  attendeeImages,
  host,
  image,
  location,
  time,
  title,
  cleanName,
  attendeeNumber,
}: EventSearchItemProps) {
  return (
    <Link
      href={`/user/events/${cleanName.toLowerCase()}`}
      className="px-[20px] py-[25px] flex justify-between items-center rounded-[20px] bg-secondary"
    >
      <div className="">
        <p className=" text-accent text-[14px]">{time}</p>
        <p className=" capitalize text-[16px]">{title.toLowerCase()}</p>
        <span className=" mt-[10px] flex items-center gap-2">
          <div className="">
            <FaUserCircle />
          </div>
          <p className=" text-[14px] capitalize text-accent">
            By {host.toLowerCase()}
          </p>
        </span>
        <span className=" mt-[10px] flex items-center gap-2">
          <div className="">
            <PiMapPinFill />
          </div>
          <p className=" text-[14px] capitalize text-accent">
            {location.toLowerCase()}
          </p>
        </span>
        {(attendeeImages ?? []).length > 0 && (
          <div className=" ml-[10px] items-center mt-[10px] flex">
            {(attendeeImages ?? []).map((image, k) => (
              <Image
                key={k}
                src={
                  image?.startsWith("http") || image?.startsWith("/")
                    ? image
                    : "/no-image.jpg"
                }
                alt="image"
                width={"1000"}
                height={"1000"}
                className=" w-[20px] -ml-[10px] h-[20px] rounded-full object-cover"
              />
            ))}
            <div className=" border text-[10px] -ml-[10px] px-[10px] py-[4px] bg-secondary rounded-[10px] ">
              +{attendeeNumber}
            </div>
          </div>
        )}
      </div>
      <div className="">
        <Image
          src={
            image?.startsWith("http") || image?.startsWith("/")
              ? image
              : "/no-image.jpg"
          }
          alt="image"
          className=" w-[90px] h-[90px] object-cover rounded-[20px]"
          width={"1000"}
          height={"1000"}
        />
      </div>
    </Link>
  );
}
