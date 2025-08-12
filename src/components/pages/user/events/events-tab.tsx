"use client";

import ManageEvents from "@/components/pages/user/events/manage-events";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function EventsTab({ initialTab }: { initialTab: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("q") || "manage";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("q", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div>
      <Tabs
        value={tab}
        onValueChange={handleChange}
        className=" bg-[#000]  rounded-none"
      >
        <TabsList className=" flex w-full border-b-[4px] border-secondary py-[23px] justify-between rounded-none bg-black">
          <TabsTrigger
            className="data-[state=active]:bg-black text-[14px] text-center data-[state=active]:border-b-[4px] data-[state=active]:py-[24px] data-[state=active]:border-white data-[state=active]:border-l-0 data-[state=active]:rounded-none data-[state=active]:border-r-0 data-[state=active]:border-t-0  data-[state=active]:text-white  "
            value="manage"
          >
            <Link href={"?q=manage"}>Manage events</Link>
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-black text-[14px] text-center data-[state=active]:border-b-[4px] data-[state=active]:py-[24px] data-[state=active]:border-white data-[state=active]:border-l-0 data-[state=active]:rounded-none data-[state=active]:border-r-0 data-[state=active]:border-t-0  data-[state=active]:text-white  "
            value="discover"
          >
            <Link href={"?q=discover"}>Discover</Link>
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-black text-[14px] text-center data-[state=active]:border-b-[4px] data-[state=active]:py-[24px] data-[state=active]:border-white data-[state=active]:border-l-0 data-[state=active]:rounded-none data-[state=active]:border-r-0 data-[state=active]:border-t-0  data-[state=active]:text-white  "
            value="create"
          >
            <Link href={"?q=create"}>Create event</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="manage">
          <div className=" h-full">
            <ManageEvents />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
