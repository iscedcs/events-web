"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import CreateEvent from "./create-events/create-events";
import Discover from "./discover/discover";
import ManageEvents from "./manage-events/manage-events";

export default function EventsTab({ initialTab }: { initialTab: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") || initialTab;

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString()); // ✅ clone properly
    params.set("tab", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative">
      <Tabs
        value={tab}
        onValueChange={handleChange}
        className="bg-black rounded-none"
      >
        <TabsList className="flex w-full border-b-[4px] border-secondary py-[23px] justify-between rounded-none bg-black">
          <TabsTrigger
            value="manage"
            className="text-[14px] text-center data-[state=active]:border-b-[4px] data-[state=active]:py-[24px] data-[state=active]:border-white data-[state=active]:rounded-none data-[state=active]:text-white"
          >
            Manage events
          </TabsTrigger>
          <TabsTrigger
            value="discover"
            className="text-[14px] text-center data-[state=active]:border-b-[4px] data-[state=active]:py-[24px] data-[state=active]:border-white data-[state=active]:rounded-none data-[state=active]:text-white"
          >
            Discover
          </TabsTrigger>
          <TabsTrigger
            value="create"
            className="text-[14px] text-center data-[state=active]:border-b-[4px] data-[state=active]:py-[24px] data-[state=active]:border-white data-[state=active]:rounded-none data-[state=active]:text-white"
          >
            Create event
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manage">
          <ManageEvents />
        </TabsContent>
        <TabsContent value="discover">
          <Discover />
        </TabsContent>
        <TabsContent value="create">
          <CreateEvent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
