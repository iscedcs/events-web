import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Going from "./tabcontents/going";
import Hosting from "./tabcontents/hosting";
import Interested from "./tabcontents/interested";
import Past from "./tabcontents/past";

export default function ManageEvents() {
  return (
    <div className=" relative px-[10px]">
      <div className=" w-full">
        <div className="">
          <p className=" text-[24px] mt-[15px] font-bold">My Events</p>
        </div>
        {/* <div className="">
          <EventCalendar eventType="going" type="multiple" />
        </div> */}
      </div>

      <div className=" mt-[20px] w-full">
        <Tabs defaultValue="going" className=" w-full">
          <TabsList className="text-[25px] h-full bg-secondary grid grid-cols-4 ">
            <TabsTrigger className=" py-[8px] rounded-full" value="going">
              Going
            </TabsTrigger>
            <TabsTrigger className=" py-[8px] rounded-full" value="hosting">
              Hosting
            </TabsTrigger>
            <TabsTrigger className=" py-[8px] rounded-full" value="interested">
              Interested
            </TabsTrigger>
            <TabsTrigger className=" py-[8px] rounded-full" value="pastEvents">
              Past
            </TabsTrigger>
          </TabsList>
          <TabsContent value="going">
            <Going />
          </TabsContent>
          <TabsContent value="hosting">
            <Hosting />
          </TabsContent>
          <TabsContent value="interested">
            <Interested />
          </TabsContent>
          <TabsContent value="pastEvents">
            <Past />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
