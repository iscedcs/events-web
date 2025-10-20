import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";

export default function ClosedRegistration() {
  return (
    <div>
      <div className=" mt-[30px] rounded-[20px] overflow-hidden  border border-accent  ">
        <div className=" bg-secondary">
          <p className=" px-[20px] py-[10px] text-[14px]">
            Registration Information
          </p>
        </div>
        <div className=" px-[20px] py-[10px]">
          <p>Registration Closed</p>
        </div>
      </div>
    </div>
  );
}
