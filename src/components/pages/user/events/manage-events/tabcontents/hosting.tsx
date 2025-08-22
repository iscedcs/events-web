"use client";

import { Button } from "@/components/ui/button";
import EventCalendar from "@/components/ui/secondary/event-calendar";
import { useRouter } from "next/navigation";

export default function Hosting() {
  //   const searchParams = useSearchParams();

  const router = useRouter();

  return (
    <div className=" text-center  h-[calc(100vh_-(_55px+50px+51px+44px))]  overflow-hidden flex items-center justify-between">
      <div className=" px-[10px] absolute top-0 right-0">
        <EventCalendar eventType="going" type="multiple" />
      </div>
      <div className="">
        <p className=" text-accent text-[24px]">
          Host, attend and bookmark events near you to get started
        </p>
        <Button
          onClick={() => {
            router.push("/user/events?tab=discover");
          }}
          className=" text-[12px] mt-[20px]"
        >
          Discover events
        </Button>
      </div>
    </div>
  );
}
