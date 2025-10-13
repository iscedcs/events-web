"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { eventCreationSchema } from "@/lib/schema/event-creation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsGlobe } from "react-icons/bs";
import { FaCalendarDay } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { LuArrowUpToLine, LuTicket } from "react-icons/lu";
import { MdOutlineMessage } from "react-icons/md";
import z from "zod";
import DateTimeField from "./form-controller/date-time-field";
import ImageField from "./form-controller/image-field";
import LocationField from "./form-controller/location-field";
import TitleField from "./form-controller/title-field";
import HostNameField from "./form-controller/host-name";
import EventDescriptionField from "./form-controller/event-description-field";
import TicketTypeField from "./form-controller/ticket-type-field";

export type eventCreationFormValues = z.infer<typeof eventCreationSchema>;
export default function EventCreationForm() {
  const [startOpen, setStartOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const [endOpen, setEndOpen] = useState(false);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const form = useForm<eventCreationFormValues>({
    defaultValues: {
      location: "",
      host: "",
    },
    resolver: zodResolver(eventCreationSchema),
    mode: "all",
  });

  const handleSubmit = () => {};

  return (
    <Form {...form}>
      <form className="mt-[20px]">
        <Controller
          name="image"
          control={form.control}
          render={({ field }) => (
            <ImageField onChange={field.onChange} value={field.value} />
          )}
        />
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

        <Controller
          name="title"
          control={form.control}
          render={({ field }) => (
            <TitleField
              onChange={field.onChange}
              value={field.value}
              placeholder="Event Name"
            />
          )}
        />

        <DateTimeField />

        <Controller
          name="location"
          control={form.control}
          render={({ field }) => (
            <LocationField
              value={field.value}
              placeholder="Start typing to view locations"
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          control={form.control}
          name="host"
          render={({ field }) => (
            <HostNameField
              onChange={field.onChange}
              value={field.value}
              placeholder="John Doe"
            />
          )}
        />

        <Controller
          control={form.control}
          name="host"
          render={({ field }) => (
            <EventDescriptionField
              onChange={field.onChange}
              value={field.value}
              placeholder="What’s the event about?"
            />
          )}
        />

        <div className=" mt-[20px]">
          <p>Event Options</p>
          <div className=" mt-[20px] text-accent rounded-[12px] py-[15px] px-[20px] bg-secondary">
            <TicketTypeField />
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
      </form>
    </Form>
  );
}
