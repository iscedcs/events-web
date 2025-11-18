import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ExternalFieldsProps } from "@/lib/types/event";
import { formatWithCommas } from "@/lib/utils";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { LuArrowUpToLine } from "react-icons/lu";

export default function AudienceCapacity({
  onChange,
  value,
  placeholder,
}: ExternalFieldsProps) {
  return (
    <div>
      <div className="">
        <div className=" mt-[10px] flex items-center justify-between">
          <div className=" flex items-center gap-2">
            <LuArrowUpToLine />
            <p className=" text-white">Capacity</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <div className=" flex items-center gap-2">
                <p>
                  {value && value !== "0"
                    ? formatWithCommas(Number(value))
                    : "No Value"}
                </p>
                <AiOutlineEdit />
              </div>
            </DialogTrigger>
            <DialogContent className=" bg-secondary border-0">
              <DialogTitle hidden>Content</DialogTitle>
              <p>Max Capacity</p>
              <p className=" text-accent">
                Auto-close registration when the capacity is reached. Only
                approved guests count toward the cap.
              </p>
              <div className="">
                <p>Capacity</p>
                <Input
                  type="number"
                  value={Number(value)}
                  onChange={(e) => onChange(Number(e.target.value))}
                  placeholder={placeholder}
                  className=" rounded-[8px] px-[10px] mt-[10px] bg-[#151515]"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <hr className=" mt-[10px] border-accent" />
      </div>
    </div>
  );
}
