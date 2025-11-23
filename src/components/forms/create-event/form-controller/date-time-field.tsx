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
import { convertTo12Hour, convertTo24Hour } from "@/lib/utils";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MdAccessTime } from "react-icons/md";

export default function DateTimeField() {
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const { control, watch } = useFormContext();

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const time = watch("time");
  const endTime = watch("endTime");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="mt-[20px]">
          <div className="bg-secondary rounded-[12px] py-[20px] px-[15px]">
            <div className="flex items-center gap-3">
              <MdAccessTime className="text-accent w-[20px] h-[20px]" />
              <div>
                <p>
                  {startDate
                    ? format(new Date(startDate), "ccc, MMM dd")
                    : "Pick a date"}
                </p>
                <p className="text-accent">
                  {time ? `${time} GMT +1` : "Pick a time"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="p-[13px] border-0 bg-secondary">
        <DialogTitle hidden>Content</DialogTitle>
        <p>Event Time</p>

        {/* ---- START ---- */}
        <div className="flex gap-5 items-center">
          <p className="text-accent w-10">Start</p>
          <div className="flex-col flex gap-3">
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <Popover open={startOpen} onOpenChange={setStartOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-between rounded-[8px] bg-[#151515] font-normal"
                    >
                      {field.value
                        ? format(new Date(field.value), "ccc PP")
                        : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto bg-[#151515] text-white border-0 overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      fromDate={new Date()}
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        if (date) field.onChange(format(date, "yyyy-MM-dd"));
                        setStartOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />

            <Controller
              control={control}
              name="time"
              render={({ field }) => (
                <Input
                  type="time"
                  step="1"
                  min={
                    startDate === format(new Date(), "yyyy-MM-dd")
                      ? format(new Date(), "HH:mm")
                      : "00:00"
                  }
                  {...field}
                  value={field.value ? convertTo24Hour(field.value) : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    const formatted12Hour = convertTo12Hour(value);
                    field.onChange(formatted12Hour);
                  }}
                  className="bg-[#151515] rounded-[8px] px-[15px] appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                />
              )}
            />
          </div>
        </div>

        <hr className="border-accent my-3" />

        {/* ---- END ---- */}
        <div className="flex gap-5 items-center">
          <p className="text-accent w-10">End</p>
          <div className="flex-col flex gap-3">
            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <Popover open={endOpen} onOpenChange={setEndOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-between rounded-[8px] bg-[#151515] font-normal"
                    >
                      {field.value
                        ? format(new Date(field.value), "ccc PP")
                        : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto bg-[#151515] text-white border-0 overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      fromDate={new Date()}
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        if (date) field.onChange(format(date, "yyyy-MM-dd"));
                        setEndOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />

            <Controller
              control={control}
              name="endTime"
              render={({ field }) => (
                <Input
                  type="time"
                  step="1"
                  {...field}
                  value={field.value ? convertTo24Hour(field.value) : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    const formatted12Hour = convertTo12Hour(value);
                    field.onChange(formatted12Hour);
                  }}
                  className="bg-[#151515] rounded-[8px] px-[15px] appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                />
              )}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
