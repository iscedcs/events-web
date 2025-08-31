"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function EmptyState() {
  const router = useRouter();
  return (
    <div className=" text-center  h-[calc(100vh_-(_55px+50px+51px+44px))]  overflow-hidden flex items-center justify-between">
      <div className="">
        <p className=" text-accent text-[24px]">
          Host, attend and bookmark events near you to get started
        </p>
        <Button
          onClick={() => {
            router.push("/user/events?tab=discover");
          }}
          className=" text-[12px] mt-[15px]"
        >
          Discover events
        </Button>
      </div>
    </div>
  );
}
