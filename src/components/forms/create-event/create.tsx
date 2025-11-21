"use client";

import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventCreationSchema } from "@/lib/schema/event-creation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FieldErrors, useForm } from "react-hook-form";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoaderCircle, TriangleAlert } from "lucide-react";
import { SingleEventProps } from "@/lib/types/event";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type eventCreationFormValues = z.infer<typeof eventCreationSchema>;
export default function EventCreationForm() {
  const [loading, setIsLoading] = useState(false);
  const [oepnErrorDialog, setOpenErrorDialog] = useState(false);
  const [error, setErrors] = useState<FieldErrors<eventCreationFormValues>>();

  const form = useForm<eventCreationFormValues>({
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
      hasFreeTickets: true,
      audienceSize: 0,
      tickets: [],
    },
    resolver: zodResolver(eventCreationSchema),
    mode: "all",
  });

  const router = useRouter();

  const handleSubmit = async (data: eventCreationFormValues) => {
    const isValid = await form.trigger();

    setIsLoading(true);
    // console.log("Form submitted", data);
    const payload: eventCreationFormValues = {
      audienceSize: data.audienceSize,
      categories: data.categories,
      description: data.description,
      endDate: data.endDate,
      host: data.host,
      isPublic: data.isPublic,
      latitude: data.latitude,
      location: data.location,
      longitude: data.longitude,
      startDate: data.startDate,
      time: data.time,
      title: data.title,
      town: data.town,
      image: data.image,
      tickets: data.tickets,
      hasFreeTickets: true,
    };

    try {
      const response = await fetch("/api/event/new", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const event: SingleEventProps = data.data;

      if (response.ok) {
        setIsLoading(false);
        toast.success("Your event was created successfully");
        form.reset();
        router.push(`/user/events/${event.cleanName.toLowerCase()}`);
      } else {
        setIsLoading(false);
        toast.error("Something went wrong with creating your event");
        form.reset();
        router.refresh();
      }
    } catch (e: any) {
      setIsLoading(false);
      toast.error("Something went wrong");
      form.reset();
      console.log("Event not created successfully", e);
    }
  };

  const onInvalid = (errors: FieldErrors<eventCreationFormValues>) => {
    setErrors(errors);
    setOpenErrorDialog(true);
  };

  const checkValidity = async () => {
    const isValid = await form.trigger();
    console.log("Form is valid?", isValid);

    if (!isValid) {
      console.log("There are validation errors:", form.formState.errors);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit, onInvalid)}
          className="mt-[20px]"
        >
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

          <div className="">
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
            <p className=" text-error text-[12px] mt-[10px]">
              {form.formState.errors.title?.message}
            </p>
          </div>

          <div className="">
            <DateTimeField />
            {form.formState.errors.startDate?.message &&
              form.formState.errors.endDate?.message &&
              form.formState.errors.time?.message && (
                <p className=" text-error text-[12px] mt-[10px]">
                  {form.formState.errors.startDate?.message},{" "}
                  {form.formState.errors.endDate?.message},{" "}
                  {form.formState.errors.time?.message}
                </p>
              )}
          </div>

          <div className="">
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
                    const parsedLat = parseFloat(lat?.toString() ?? "0");
                    const parsedLng = parseFloat(lng?.toString() ?? "0");
                    form.setValue(
                      "latitude",
                      !isNaN(parsedLat) ? parsedLat : 0
                    );
                    form.setValue(
                      "longitude",
                      !isNaN(parsedLng) ? parsedLng : 0
                    );
                  }}
                />
              )}
            />
            <p className=" text-error text-[12px] mt-[10px]">
              {form.formState.errors.location?.message}
            </p>
          </div>

          <div className="">
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
            <p className=" text-error text-[12px] mt-[10px]">
              {form.formState.errors.host?.message}
            </p>
          </div>

          <div className="">
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
            <p className=" text-error text-[12px] mt-[10px]">
              {form.formState.errors.description?.message}
            </p>
          </div>

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
          {/* <Button type="button" onClick={checkValidity} className="mt-4">
            Check Validity
          </Button> */}

          <Button
            type="submit"
            disabled={loading}
            className=" mt-[30px] flex flex-row items-center w-full rounded-[12px] font-semibold py-[24px]"
          >
            {loading && (
              <span className=" animate-spin">
                <LoaderCircle />
              </span>
            )}
            {loading ? "Creating Event" : "Create Event"}
          </Button>
        </form>
      </Form>
      <Dialog open={oepnErrorDialog} onOpenChange={setOpenErrorDialog}>
        <DialogContent className=" bg-secondary border-0">
          <DialogHeader>
            <DialogTitle className=" text-error flex items-center gap-2">
              <TriangleAlert />
              <p>Important</p>
            </DialogTitle>
            <DialogDescription className=" text-left">
              The following issues have been spotted in your event.
            </DialogDescription>
            <p className=" text-[14px] text-left">
              {error &&
                Object.entries(error).map(([key, val]) => (
                  <li className="" key={key}>
                    <strong className=" capitalize">{key}:</strong>{" "}
                    {(val as any)?.message ?? "Invalid input"}
                  </li>
                ))}
            </p>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="  flex flex-row items-center w-full rounded-[12px] font-semibold py-[24px]">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
