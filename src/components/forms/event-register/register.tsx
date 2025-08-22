"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventRegistrationFormSchema } from "@/lib/schema/event-registration";
import { SingleEventProps, SingleTicketProps } from "@/lib/types/event";
import { UserProps } from "@/lib/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuTicket } from "react-icons/lu";
import { PiCrownBold } from "react-icons/pi";
import { RxCaretRight } from "react-icons/rx";
import z from "zod";
import { getEventsByCleanName } from "../../../../actions/events";
import { getTicketByID } from "../../../../actions/tickets";
import { getUserByID } from "../../../../actions/user";

export default function EventRegistrationForm({ slug }: { slug: string }) {
  const session = useSession();
  const [user, setUser] = useState<UserProps>();
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState<SingleEventProps>();
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [ticketInfo, setTicketInfo] = useState<SingleTicketProps>();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserByID(session.data?.user.id ?? "");
      setUser(userData);
    };
    fetchUser();
  }, [session.data?.user.id]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventData = await getEventsByCleanName(slug);
      setEvent(eventData);
    };
    if (slug) fetchEvents();
  }, [slug]);

  useEffect(() => {
    const fetchTicket = async () => {
      const ticketData = await getTicketByID(selectedTicket);
      setTicketInfo(ticketData);
    };
    if (selectedTicket) fetchTicket();
  }, [selectedTicket]);

  type eventRegistrationFormValues = z.infer<
    typeof eventRegistrationFormSchema
  >;

  const form = useForm<eventRegistrationFormValues>({
    resolver: zodResolver(eventRegistrationFormSchema),
    defaultValues: {
      email: "",
      name: "",
    },
    mode: "all",
  });

  const eventTicket: SingleTicketProps[] = event?.tickets ?? [];
  console.log({ eventTicket });
  console.log({ selectedTicket });

  const handleSubmit = (data: eventRegistrationFormValues) => {
    console.log({ data });
  };

  return (
    <>
      <div className=" mt-[20px]">
        <p className=" font-extrabold text-[24px]">
          Provide your info for the event
        </p>
        <div className=" relative h-[600px] ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className=" mt-[20px]">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Name"
                        className=" py-[20px] text-[20px] outline-0 rounded-none border-l-0 placeholder:text-[20px] border-r-0 border-t-0 "
                      />
                    </FormControl>
                    <FormMessage className=" text-accent" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className=" mt-[20px]">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Email"
                        className=" py-[20px] text-[20px] outline-0 rounded-none border-l-0 placeholder:text-[20px] border-r-0 border-t-0 "
                      />
                    </FormControl>
                    <FormMessage className=" text-accent" />
                  </FormItem>
                )}
              />
              <div className=" w-full mt-[20px]">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger className=" flex justify-between items-center text-[20px]">
                    {ticketInfo?.title ?? "Select ticket"}
                    <RxCaretRight />
                  </DialogTrigger>
                  <DialogContent className=" border-0 bg-secondary">
                    <DialogTitle hidden>Ticket</DialogTitle>
                    <p className=" text-[16px]">Ticketing types</p>
                    {eventTicket.map((ticket) => {
                      const handleTicketSelect = () => {
                        setSelectedTicket(
                          selectedTicket === ticket.id ? null : ticket.id
                        );
                        setOpen(false);
                      };

                      return (
                        <div
                          onClick={handleTicketSelect}
                          key={ticket.id}
                          className=" flex justify-between items-center"
                        >
                          <div className=" flex gap-3 items-center">
                            {ticket.isFree ? (
                              <LuTicket className=" w-[24px] h-[24px]" />
                            ) : (
                              <PiCrownBold className=" w-[24px] h-[24px]" />
                            )}
                            <div className="">
                              <p className=" text-[16px]">{ticket.title}</p>
                              <p className=" text-accent text-[16px]">
                                ₦{ticket.amount}
                              </p>
                            </div>
                          </div>
                          <div className="">
                            <Checkbox
                              onCheckedChange={handleTicketSelect}
                              checked={selectedTicket === ticket.id}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </DialogContent>
                </Dialog>
              </div>
              <div className=" absolute bottom-0 mb-[30px] w-full">
                <Button
                  type="submit"
                  className=" w-full rounded-[12px] font-semibold py-[24px] "
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
