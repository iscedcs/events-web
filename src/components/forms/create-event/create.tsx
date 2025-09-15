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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsGlobe } from "react-icons/bs";
import { FaCalendarDay } from "react-icons/fa";
import { FaCircleUser, FaLocationDot } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { LuArrowUpToLine, LuImage, LuTicket } from "react-icons/lu";
import { MdAccessTime, MdOutlineMessage } from "react-icons/md";

export default function EventCreationForm() {
  const [startOpen, setStartOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const [endOpen, setEndOpen] = useState(false);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  return (
    <div className="mt-[20px]">
      <div className="bg-secondary relative h-[400px] w-full rounded-[24px]">
        <div className="absolute mr-[10px] mb-[10px] right-0 bottom-0 bg-white w-[50px] h-[50px] rounded-full">
          <div className="relative flex items-center justify-center w-full h-full">
            <LuImage className="w-[25px] h-[25px] text-secondary" />
          </div>
        </div>
      </div>

      <div className="mt-[20px] flex justify-between">
        <Select>
          <SelectTrigger className="bg-secondary border-0 text-white px-[10px] py-[20px] rounded-[12px] flex items-center gap-2">
            <FaCalendarDay className="w-[18px] h-[18px]" />
            <SelectValue placeholder="My Calendar" />
          </SelectTrigger>
          <SelectContent className=" w-[60%] rounded-[20px] px-[15px] py-[10px] text-white border-0 bg-secondary">
            <p className=" text-accent text-[13px]">
              Choose the calendar of the event:
            </p>
            <div className=" mt-[10px]">
              <SelectItem value="apple">Google Calendar</SelectItem>
              <SelectItem value="banana">Apple Calendar</SelectItem>
            </div>
            <div className=" text-accent mt-[20px] flex gap-3 items-center">
              <div className="">
                <IoIosInformationCircleOutline className=" w-[20px] h-[20px]" />
              </div>
              <p className=" text-[13px]">
                Creating the event under a calendar grants its admins manage
                access.
              </p>
            </div>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="bg-secondary border-0 text-white px-[10px] py-[20px] rounded-[12px] flex items-center gap-2">
            <BsGlobe className="w-[18px] h-[18px]" />
            <SelectValue placeholder="Visibility" />
          </SelectTrigger>
          <SelectContent className="w-[80%] rounded-[20px] px-[15px] py-[10px] text-white border-0 bg-secondary">
            <div className=" flex gap-1 flex-col">
              <SelectItem className=" pl-0 text-[16px]" value="private">
                Private
              </SelectItem>
              <p className=" text-[13px] text-accent">
                Shown on your calendar and eligible to be featured
              </p>
            </div>
            <div className=" flex gap-1 mt-[20px] flex-col">
              <SelectItem className=" pl-0 text-[16px]" value="public">
                Public
              </SelectItem>
              <p className=" text-[13px] text-accent">
                Shown on your calendar and eligible to be featured
              </p>
            </div>
          </SelectContent>
        </Select>
      </div>

      <div className=" mt-[20px]">
        <Input
          className=" text-[32px] border-0 rounded-none"
          placeholder="Event Name"
        />
      </div>

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

      <Dialog>
        <DialogTrigger asChild>
          <div className=" mt-[20px]">
            <div className=" bg-secondary rounded-[12px] py-[20px] px-[15px]">
              <div className=" flex items-center gap-3  ">
                <FaLocationDot className=" text-accent w-[20px] h-[20px]" />
                <div className="">
                  <p>Add Event Location</p>
                  <p className=" text-accent">
                    Offline location or virtual link
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className=" border-0 bg-secondary">
          <DialogTitle hidden>Content</DialogTitle>
          <div className="">
            <p>Content</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <div className=" mt-[20px]">
            <div className=" bg-secondary rounded-[12px] py-[20px] px-[15px]">
              <div className=" flex items-center gap-3  ">
                <FaCircleUser className=" text-accent w-[20px] h-[20px]" />
                <div className="">
                  <p>Host Name</p>
                  <p className=" text-accent">John Doe</p>
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className=" border-0 bg-secondary">
          <DialogTitle hidden>Content</DialogTitle>
          <div className="">
            <p>Event Host Name</p>
            <Input
              className="bg-[#151515] mt-[10px] rounded-[8px] px-[20px]"
              placeholder="John Doe"
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <div className=" mt-[20px]">
            <div className=" bg-secondary rounded-[12px] py-[20px] px-[15px]">
              <div className=" flex items-center gap-3  ">
                <HiOutlineDocumentText className=" text-accent w-[20px] h-[20px]" />
                <div className="">
                  <p>Add Description</p>
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className=" w-full border-0 bg-secondary">
          <DialogTitle hidden>Content</DialogTitle>
          <div className=" w-full">
            <p>Event Description</p>
            <Textarea
              placeholder="What’s the event about?"
              className="focus-visible:ring-0 border-1 rounded-[8px] h-[100px] mt-[10px] w-full break-all bg-[#151515] resize-none"
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className=" mt-[20px]">
        <p>Event Options</p>
        <div className=" mt-[20px] text-accent rounded-[12px] py-[15px] px-[20px] bg-secondary">
          <div className="">
            <div className=" flex items-center justify-between">
              <div className=" flex items-center gap-2">
                <LuTicket />
                <p className=" text-white">Tickets</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <div className=" flex items-center gap-2">
                    <p>Free</p>
                    <AiOutlineEdit />
                  </div>
                </DialogTrigger>
                <DialogContent className=" bg-secondary border-0">
                  <DialogTitle hidden>Content</DialogTitle>
                  <p>Content</p>
                </DialogContent>
              </Dialog>
            </div>
            <hr className=" mt-[10px] border-accent" />
          </div>
          <div className="">
            <div className=" mt-[10px] flex items-center justify-between">
              <div className=" flex items-center gap-2">
                <LuArrowUpToLine />
                <p className=" text-white">Capacity</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <div className=" flex items-center gap-2">
                    <p>Unlimited</p>
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
                      className=" rounded-[8px] px-[10px] mt-[10px] bg-[#151515]"
                    />
                  </div>
                  <div className=" flex justify-between items-center">
                    <p>Over-Capacity Waitlist</p>
                    <Switch />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <hr className=" mt-[10px] border-accent" />
          </div>
          <div className="">
            <div className=" mt-[10px] flex items-center justify-between">
              <div className=" flex items-center gap-2">
                <BiCategory />
                <p className=" text-white">Category</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <div className=" flex items-center gap-2">
                    <p>Select Category</p>
                    <AiOutlineEdit />
                  </div>
                </DialogTrigger>
                <DialogContent className=" bg-secondary border-0">
                  <DialogTitle hidden>Content</DialogTitle>
                  <div className="">
                    <p className=" text-accent">
                      Choose the category of the event:
                    </p>
                    <div className="">
                      <ScrollArea></ScrollArea>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <hr className=" mt-[10px] border-accent" />
          </div>
          <div className="">
            <div className=" mt-[10px] flex items-center justify-between">
              <div className=" flex items-center gap-2">
                <MdOutlineMessage />
                <p className=" text-white">Event chat</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <div className=" flex items-center gap-2">
                    <p>Enabled</p>
                    <AiOutlineEdit />
                  </div>
                </DialogTrigger>
                <DialogContent className=" bg-secondary border-0">
                  <DialogTitle hidden>Content</DialogTitle>
                  <p>Content</p>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <Button className=" mt-[30px] w-full rounded-[12px] font-semibold py-[24px]">
        Create Event
      </Button>
    </div>
  );
}
