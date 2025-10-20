import AvailableEvents from "@/components/pages/public/available-events";
import LocationEvents from "@/components/pages/public/location-events";
import { SignIn, SignUp } from "@/components/shared/auth/authButtons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function IntroPage() {
  return (
    <div className="">
      <div className=" flex justify-between p-3 items-center">
        <p>Events</p>
        <div className=" flex gap-2 ">
          <SignIn />
          <SignUp />
        </div>
      </div>

      <div className=" mt-[40px] p-3">
        <p className=" text-5xl font-bold">
          Discover And Host The Best Events.
        </p>
        <div className=" mt-[10px]">
          <SignUp />
        </div>
      </div>

      <div className=" mt-[20px]">
        <Tabs defaultValue="hosted" className="bg-black rounded-none">
          <TabsList className="flex w-full border-b-[4px] border-secondary py-[23px] justify-between rounded-none bg-black">
            <TabsTrigger
              className="text-[14px] text-accent text-center data-[state=active]:border-b-[4px] data-[state=active]:py-[24px] data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:border-t-0 data-[state=active]:bg-black data-[state=active]:border-white data-[state=active]:rounded-none data-[state=active]:text-white"
              value="hosted"
            >
              Available Events
            </TabsTrigger>
            <TabsTrigger
              className="text-[14px] text-accent text-center data-[state=active]:border-b-[4px] data-[state=active]:py-[24px] data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:border-t-0 data-[state=active]:bg-black data-[state=active]:border-white data-[state=active]:rounded-none data-[state=active]:text-white"
              value="location"
            >
              Events Around You
            </TabsTrigger>
          </TabsList>
          <TabsContent value="hosted">
            <AvailableEvents />
          </TabsContent>
          <TabsContent value="location">
            <LocationEvents />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
