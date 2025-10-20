import Image from "next/image";
import React from "react";

export default function TypingWatchBar() {
  return (
    <div className=" absolute z-30   w-full mb-[70px] py-[10px]  bg-[#000000d5]  bottom-0 left-0 ">
      <div className=" flex items-center px-[10px]  gap-3 ">
        <div className=" flex items-center">
          <Image
            src={"/no-profile.png"}
            alt="image"
            width={"20"}
            height={"20"}
            className=" border border-black rounded-full"
          />
          <Image
            src={"/no-profile.png"}
            alt="image"
            width={"20"}
            height={"20"}
            className="border border-black -ml-[10px] rounded-full"
          />
          <Image
            src={"/no-profile.png"}
            alt="image"
            width={"20"}
            height={"20"}
            className="border border-black -ml-[10px] rounded-full"
          />
          <Image
            src={"/no-profile.png"}
            alt="image"
            width={"20"}
            height={"20"}
            className="border border-black -ml-[10px] rounded-full"
          />
          <p className=" text-[12px]">+4</p>
        </div>
        <div className=" text-accent text-[12px]">
          <p>typing..</p>
        </div>
      </div>
    </div>
  );
}
