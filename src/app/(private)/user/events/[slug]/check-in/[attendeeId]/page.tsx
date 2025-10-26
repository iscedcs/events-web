import Header from "@/components/shared/layout/header";
import React from "react";
import { getUserByID } from "../../../../../../../../actions/user";
import { getAuthInfo } from "../../../../../../../../actions/auth";
import { CircleCheck } from "lucide-react";
import { getAttendeeID } from "../../../../../../../../actions/attendee";
import { SingleAttendeeProps } from "@/lib/types/event";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { SingleTicketProps } from "@/lib/types/ticket";
import { getTicketByID } from "../../../../../../../../actions/tickets";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Params = Promise<{ attendeeId: string }>;
export default async function CheckIn({ params }: { params: Params }) {
  const { attendeeId } = await params;
  const session = await getAuthInfo();
  const headerUser = await getUserByID(session.user?.id ?? "");

  const attendeeInfo: SingleAttendeeProps = await getAttendeeID(attendeeId);
  const ticketInfo: SingleTicketProps = await getTicketByID(
    attendeeInfo.ticketId
  );

  return (
    <div className=" px-[10px] ">
      <Header hasBack title={"Check In"} user={headerUser} />

      <div className=" rounded-[20px] py-[20px] px-[20px] bg-secondary mt-[70px]">
        <div className=" flex flex-col gap-3 py-[20px] justify-center  items-center">
          <Image
            alt="dp"
            src={attendeeInfo.image ? attendeeInfo.image : "/no-profile.png"}
            width={"100"}
            height={"100"}
            className=" w-[100px] border-4 border-success h-[100px] rounded-full object-cover"
          />
          <div className=" flex items-center flex-col justify-center">
            <p>{attendeeInfo.name}</p>
            {attendeeInfo.checkedIn && (
              <Badge className=" bg-accent text-white">{"CHECKED IN"}</Badge>
            )}
          </div>
        </div>

        <div className=" flex flex-row flex-wrap gap-5  border border-b-0 border-l-0 border-r-0 py-[20px] border-accent border-dashed ">
          <div className="">
            <p className=" text-[14px] text-accent">Ticket Title:</p>
            <p className=" text-[16px] capitalize ">{ticketInfo.title}</p>
          </div>
          <div className="">
            <p className=" text-[14px] text-accent">Event Name:</p>
            <p className=" text-[16px] capitalize ">
              {attendeeInfo.eventName.toLowerCase()}
            </p>
          </div>
          <div className="">
            <p className=" text-[14px] text-accent">Phone Number:</p>
            <p className=" text-[16px] capitalize ">{attendeeInfo.phone}</p>
          </div>
          <div className="">
            <p className=" text-[14px] text-accent">Email Address:</p>
            <p className=" text-[16px] ">{attendeeInfo.email}</p>
          </div>
        </div>

        <div className=" flex flex-row flex-wrap gap-5  border border-b-0 border-l-0 border-r-0 py-[20px] border-accent border-dashed ">
          <Button className=" mt-[20px] py-[23px] text-[16px] font-semibold rounded-[12px] w-full">
            <Link
              href={`/user/events/${ticketInfo.event?.cleanName.toLowerCase()}`}
            >
              View Event Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
