import Header from "@/components/shared/layout/header";
import {  SingleEventProps } from "@/lib/types/event";
import Image from "next/image";
import { getAttendeesEventID } from "../../../../../../../actions/attendee";
import { getCurrentUser } from "../../../../../../../actions/auth";
import { getEventsByCleanName } from "../../../../../../../actions/events";
import { getUserByID } from "../../../../../../../actions/user";
import { SingleAttendeeProps } from "@/lib/types/attendee";

type Params = Promise<{ slug: string }>;
export default async function Attendees(props: { params: Params }) {
  const params = await props.params;
  const me = await getCurrentUser();
  const userId = me?.id ?? null;
  const formattedProps = encodeURIComponent(params.slug);

  const event: SingleEventProps = await getEventsByCleanName(
    formattedProps ?? ""
  );

  const headerUser = userId ? await getUserByID(userId) : null;
  const attendees: SingleAttendeeProps[] = await getAttendeesEventID(event.id);

  return (
    <div>
      <Header
        hasBack
        title={`Attendees: ${event?.title.toLowerCase()}`}
        user={headerUser}
      />

      <div className=" pt-[60px] pb-[20px]">
        <div className=" mt-[5px] flex  flex-col">
          {attendees.map((attendee, k) => (
            <div
              key={k}
              className=" border border-accent/25 border-l-0 py-[15px] px-[20px] border-t-0 border-r-0 flex gap-3 items-center"
            >
              <Image
                className=" w-[32px] h-[32px] object-cover rounded-full"
                src={attendee.image ?? "/resources/no-profile.jpg"}
                alt=""
                width={"32"}
                height={"32"}
              />
              <p className=" capitalize text-[16px]">{attendee.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
