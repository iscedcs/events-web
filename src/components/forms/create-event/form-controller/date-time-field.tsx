"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateTimeFieldsProps } from "@/lib/types/event";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { MdAccessTime } from "react-icons/md";

export default function DateTimeField({
  onChange,
  startDateProps: { setStartDate, startDate },
  endDateProps: { endDate, setEndDate },
}: DateTimeFieldsProps) {
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" mt-[20px]">
          <div className=" bg-secondary rounded-[12px] py-[20px] px-[15px]">
            <div className=" flex items-center gap-3  ">
              <MdAccessTime className=" text-accent w-[20px] h-[20px]" />
              <div className="">
                <p>Wednesday, May 14</p>
                <p className=" text-accent">2:30 PM GMT +1</p>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className=" border-0 bg-secondary">
        <DialogTitle hidden>Content</DialogTitle>
        <p>Event Time</p>

        <div className=" flex gap-5 items-center">
          <div className="">
            <p className=" text-accent">Start</p>
          </div>
          <div className=" flex-col flex gap-3">
            <Popover open={startOpen} onOpenChange={setStartOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker"
                  className=" justify-between rounded-[8px] bg-[#151515] font-normal"
                >
                  {startDate ? format(startDate, "ccc PP") : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto bg-[#151515] text-white border-0 overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  className=" bg-secondary"
                  selected={startDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setStartDate(date);
                    setStartOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
            <Input
              type="time"
              id="time-picker"
              step="1"
              defaultValue="10:30:00"
              className=" bg-[#151515] rounded-[8px] px-[15px] appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
        </div>
        <hr className=" border-accent" />
        <div className=" flex gap-5 items-center">
          <div className="">
            <p className=" text-accent">End</p>
          </div>
          <div className=" flex-col flex gap-3">
            <Popover open={endOpen} onOpenChange={setEndOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker"
                  className=" justify-between bg-[#151515] rounded-[8px] font-normal"
                >
                  {endDate ? format(endDate, "ccc PP") : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto bg-[#151515] text-white border-0 overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  className=" bg-[#151515]"
                  selected={endDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setEndDate(date);
                    setEndOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
            <Input
              type="time"
              id="time-picker"
              step="1"
              defaultValue="10:30:00"
              className="bg-[#151515] rounded-[8px] px-[15px] appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
