import { Button } from "@/components/ui/button";
import { SingleAttendeeProps } from "@/lib/types/event";
import { SingleTicketProps } from "@/lib/types/ticket";
import Link from "next/link";
import { MdCancel } from "react-icons/md";
import { getTicketByID } from "../../../../../../../actions/tickets";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default async function AttendeeCard({
  attendeeInfo,
  isCheckedBefore,
}: {
  attendeeInfo: SingleAttendeeProps | null;
  isCheckedBefore: boolean;
}) {
  if (attendeeInfo === null) {
    return (
      <div className="mt-[70px] px-[20px] py-[20px] rounded-[20px] bg-secondary ">
        <div className=" flex items-center justify-center">
          <div className=" flex items-center justify-center rounded-full w-[80px] h-[80px] bg-white">
            <MdCancel className=" text-error w-40 h-40" />
          </div>
        </div>
        <p className=" mt-[20px] text-center">
          This user is not an attendee in this event
        </p>
        <p className=" text-center text-[12px] text-accent">
          The QR Code scanned is invalid
        </p>
        {/* <Button className=" mt-[20px] py-[23px] text-[16px] font-semibold rounded-[12px] w-full">
        <Link
          href={`/user/events/${ticketInfo.event?.cleanName.toLowerCase()}`}
        >
          Try Again
        </Link>
      </Button> */}
      </div>
    );
  }
  const ticketInfo: SingleTicketProps = await getTicketByID(
    attendeeInfo.ticketId
  );

  return (
    <div className=" px-[10px] ">
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
              <Badge className=" bg-success text-white">{"CHECKED IN"}</Badge>
            )}
            {isCheckedBefore && (
              <p className=" text-[13px] text-error mt-[10px]">
                This attendee has been checked in already
              </p>
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
