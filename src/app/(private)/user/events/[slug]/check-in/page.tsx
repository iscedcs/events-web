import Header from "@/components/shared/layout/header";
import React from "react";
import { getEventsByCleanName } from "../../../../../../../actions/events";
import { SingleEventProps } from "@/lib/types/event";
import { getUserByID } from "../../../../../../../actions/user";
import { getCurrentUser } from "../../../../../../../actions/auth";
import EventChatButton from "@/components/shared/event/event-chat-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScanLine } from "lucide-react";
import Link from "next/link";
import TokenValidation from "@/components/pages/user/events/single-event/attendee-check-in/token-validation";

type Params = Promise<{ slug: string }>;
export default async function CheckIn(props: { params: Params }) {
  const params = await props.params;
  const formattedProps = encodeURIComponent(params.slug);
  const event: SingleEventProps = await getEventsByCleanName(
    formattedProps ?? ""
  );

  const me = await getCurrentUser();
  const userId = me?.id ?? null;
  const headerUser = userId ? await getUserByID(userId) : null;

  return (
    <div className=" h-[100svh]">
      <Header hasBack title={event?.title.toLowerCase()} user={headerUser} />
      <EventChatButton event={event} />

      <div className=" px-[10px] pt-[15px]">
        <div className=" flex justify-between flex-col">
          <TokenValidation event={event} />
          <Link
            href={`/user/events/${params.slug}/check-in/scan`}
            className=" mb-[60px] flex flex-col gap-1  mt-5 items-center justify-center"
          >
            <ScanLine />
            <p>Scan ticket via QR instead</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
