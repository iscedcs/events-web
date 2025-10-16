import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ExternalFieldsProps } from "@/lib/types/event";
import React from "react";
import { FaCircleUser } from "react-icons/fa6";

export default function HostNameField({
  onChange,
  value,
  placeholder,
}: ExternalFieldsProps) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className=" mt-[20px]">
            <div className=" bg-secondary rounded-[12px] py-[20px] px-[15px]">
              <div className=" flex items-center gap-3  ">
                <FaCircleUser className=" text-accent w-[20px] h-[20px]" />
                <div className="">
                  <p>Host Name</p>
                  <p className=" text-accent">{value ? value : "John Doe"}</p>
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className=" p-[13px]  border-0 bg-secondary">
          <DialogTitle hidden>Event Host Name</DialogTitle>
          <div className="">
            <p>Event Host Name</p>
            <Input
              value={String(value)}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="bg-[#151515] mt-[10px] rounded-[8px] px-[20px]"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
