import AccountSettings from "@/components/pages/user/me/profile/account-settings";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAuthInfo } from "../../../../../actions/auth";
import { getUserByID } from "../../../../../actions/user";

export default async function Profile() {
  const session = await getAuthInfo();
  const userId = session.user?.id;

  const user = await getUserByID(userId ?? "");

  // console.log({ userId });
  return (
    <div className=" pb-[60px]">
      <div className=" w-full h-[100px] bg-linear-to-b from-[#6600FF] to-[#000000]"></div>
      <div className=" -mt-[40px] px-[10px]">
        <Image
          src={user?.displayPicture ?? "/no-profile.jpg"}
          alt="displayPicture"
          width={"1000"}
          height={"1000"}
          className=" w-[80px] h-[80px] object-cover rounded-full"
        />
        <div className="">
          <p className=" font-bold text-[24px]">
            {user?.firstName} {user?.lastName}
          </p>
          <p className=" text-accent text-[12px]">{user?.email}</p>
        </div>
        <div className=" flex flex-row justify-between items-center  mt-[10px] ">
          <div className="flex flex-row gap-2">
            <Button asChild>
              <Link href="events?tab=create">Host Event</Link>
            </Button>
            <Button asChild className=" bg-[#86868643]" variant={"outline"}>
              <Link href="events?tab=discover">Discover Events</Link>
            </Button>
          </div>
          <Link href={"me/my-chats"}>
            <MessageCircle className=" w-[20px] h-[20px]" />
          </Link>
        </div>
        <div className=" mt-[20px] flex flex-col items-start justify-between w-full rounded-[24px] px-[20px] py-[20px] h-[280px] bg-secondary">
          <Image
            src={"/3d-pin-location.png"}
            alt="resource"
            width={"1000"}
            height={"1000"}
            className=" w-[120px] h-[120px] object-cover"
          />
          <div className=" flex items-center justify-between">
            <div className="">
              <p>Nearby events are now available</p>
              <p className=" text-[24px]">
                Host, Attend & Bookmark events near you
              </p>
            </div>
            <ArrowRight className=" w-10 h-10" />
          </div>
        </div>
        <div className=" mt-[30px]">
          <p className=" text-[20px] font-bold">Account Settings</p>

          <AccountSettings user={user} />
        </div>
      </div>
    </div>
  );
}
