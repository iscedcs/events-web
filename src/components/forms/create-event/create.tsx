"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventCreationSchema } from "@/lib/schema/event-creation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FaCalendarDay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import z from "zod";
import AudienceCapacity from "./form-controller/audience-capacity";
import CategoriesField from "./form-controller/categories-field";
import ChatEnableField from "./form-controller/chat-enable-field";
import DateTimeField from "./form-controller/date-time-field";
import EventDescriptionField from "./form-controller/event-description-field";
import HostNameField from "./form-controller/host-name";
import ImageField from "./form-controller/image-field";
import LocationField from "./form-controller/location-field";
import TicketTypeField from "./form-controller/ticket-type-field";
import TitleField from "./form-controller/title-field";
import VisibilityField from "./form-controller/visibility-field";

export type EventCreationFormValues = z.infer<typeof eventCreationSchema>;
export default function EventCreationForm() {
  const form = useForm<EventCreationFormValues>({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      latitude: 0,
      longitude: 0,
      town: "",
      image: "",
      startDate: "",
      endDate: "",
      isPublic: true,
      time: "",
      host: "",
      categories: [],
      audienceSize: 0,
      tickets: [],
    },
    resolver: zodResolver(eventCreationSchema),
    mode: "all",
  });

  const handleSubmit = (data: EventCreationFormValues) => {
    console.log("Form submitted", data);
  };

  const checkValidity = async () => {
    const isValid = await form.trigger();
    console.log("Form is valid?", isValid);

    if (!isValid) {
      console.log("There are validation errors:", form.formState.errors);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-[20px]">
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

          <Controller
            name="isPublic"
            control={form.control}
            render={({ field }) => (
              <VisibilityField
                onChange={field.onChange}
                value={field.value}
                placeholder="Visibility"
              />
            )}
          />
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
              onChange={({ address, town, lat, lng }) => {
                field.onChange(address);
                form.setValue("town", town ?? "");
                form.setValue("latitude", Number(lat));
                form.setValue("longitude", Number(lng));
              }}
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
          name="description"
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

            <Controller
              control={form.control}
              name="audienceSize"
              render={({ field }) => (
                <AudienceCapacity
                  onChange={field.onChange}
                  value={Number(field.value) ?? 0}
                  placeholder="0"
                />
              )}
            />

            <CategoriesField />

            <ChatEnableField />
          </div>
        </div>
        <Button type="button" onClick={checkValidity} className="mt-4">
          Check Validity
        </Button>

        <Button
          type="submit"
          className=" mt-[30px] w-full rounded-[12px] font-semibold py-[24px]"
        >
          Create Event
        </Button>
      </form>
    </Form>
  );
}
