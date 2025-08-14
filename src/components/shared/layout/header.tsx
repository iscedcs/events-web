import SignOutButton from "@/components/ui/secondary/sign-out-ui";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HEADERITEMS } from "@/lib/const";
import { HederType } from "@/lib/types/layout";
import Image from "next/image";
import Link from "next/link";
import { GoLinkExternal } from "react-icons/go";

export default function Header({ title, user }: HederType) {
  const fullName = `${user?.firstName} ${user?.lastName}`;
  return (
    <div className=" flex fixed z-20 w-full left-0 top-0 items-center justify-between px-[20px] py-[10px] bg-secondary">
      <p className=" text-[12px]">{title}</p>
      <div className=" flex items-center gap-4">
        {/* <SignOutButton />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2">
              <Image
                src={user?.displayPicture ?? "/no-profile.png"}
                width={"1000"}
                height={"1000"}
                alt="image"
                className=" w-[35px] h-[35px] object-cover rounded-full"
              />
              <IoIosArrowDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" flex flex-col gap-2 text-[14px] px-[15px] py-[8px] mr-[10px] bg-secondary text-white rounded-[12px] border ">
            <p>{fullName}</p>
            <p>{user?.email}</p>
          </DropdownMenuContent>
        </DropdownMenu> */}
        <Sheet>
          <SheetTrigger asChild>
            <Image
              src={user?.displayPicture ?? "/no-profile.png"}
              width={"1000"}
              height={"1000"}
              alt="image"
              className=" w-[35px] h-[35px] object-cover rounded-full"
            />
          </SheetTrigger>
          <SheetContent className=" border-0 flex justify-between flex-col bg-secondary py-[30px] px-[20px]">
            <div className="">
              <div className=" flex items-center gap-4">
                <Image
                  src={user?.displayPicture ?? "/no-profile.png"}
                  width={"1000"}
                  height={"1000"}
                  alt="image"
                  className=" w-[50px] h-[50px] object-cover rounded-full"
                />
                <div className=" text-[13px]">
                  <p className=" font-semibold">{fullName}</p>
                  <p className=" text-accent">{user?.email}</p>
                </div>
              </div>
              <div className=" mt-[20px] text-[15px] flex gap-6 flex-col">
                {HEADERITEMS.map((item, k) => (
                  <Link
                    href={item.path}
                    key={k}
                    className="  flex items-center gap-3"
                  >
                    {item.icon}
                    <p>{item.title}</p>
                  </Link>
                ))}
                <SignOutButton />
              </div>
            </div>
            <div className=" flex flex-col gap-3">
              <Link
                href={""}
                className=" py-[20px] flex items-center justify-between rounded-[12px] px-[20px] text-black bg-accent"
              >
                <p className=" font-semibold">Connect</p>
                <GoLinkExternal />
              </Link>
              <Link
                href={""}
                className=" py-[20px] flex items-center justify-between rounded-[12px] px-[20px] text-black bg-accent"
              >
                <p className=" font-semibold">Wallet</p>
                <GoLinkExternal />
              </Link>
            </div>

            <SheetTitle hidden>Display</SheetTitle>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
