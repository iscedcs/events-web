import Image from "next/image";

export default function UpcomingEvent() {
  return (
    <div>
      <div className="  mt-[40px]">
        <p className="text-[24px]">Upcoming Event</p>
        <div className=" mt-[10px] bg-secondary p-[20px] w-full rounded-[20px] ">
          <Image
            alt="image"
            src={"/dummy-images/cover.png"}
            width={"1000"}
            height={"1000"}
            className=" w-[50%]  object-cover rounded-[20px]"
          />
          <div className=" text-[16px] mt-[10px]">
            <p>₦2,232</p>
            <p className=" text-accent">Music concert</p>
            <p className=" text-accent">Blackpink Live Acoustic</p>
          </div>
        </div>
      </div>
    </div>
  );
}
