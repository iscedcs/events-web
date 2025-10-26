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
    <div>
      <Header hasBack title={event?.title.toLowerCase()} user={headerUser} />
      <EventChatButton event={event} />

      <div className=" px-[10px] pt-[15px]">
        <p className=" text-[24px] font-bold ">Enter the access code</p>
        <Input className="rounded-none border-t-0 border-l-0 border-r-0 mt-[10px] " />
        <Button className=" mt-[30px] flex flex-row items-center w-full rounded-[12px] font-semibold py-[24px]">
          Validate
        </Button>

        <Link
          href={`/user/events/${params.slug}/check-in/scan`}
          className=" flex gap-4 mt-5 items-center justify-center"
        >
          <ScanLine />
          <p>Scan ticket via QR instead</p>
        </Link>
      </div>
    </div>
  );
}
