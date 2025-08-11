import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutButton from "@/components/ui/secondary/sign-out-ui";
import { HederType } from "@/lib/types/layout";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";

export default function Header({ title, user }: HederType) {
  const fullName = `${user?.firstName} ${user?.lastName}`;
  return (
    <div className=" flex fixed z-20 w-full top-0 items-center justify-between px-[20px] py-[10px] bg-secondary">
      <p className=" text-[12px]">{title}</p>
      <div className=" flex items-center gap-4">
        <SignOutButton />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2">
              <Image
                src={user?.displayPicture ?? ""}
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
        </DropdownMenu>
      </div>
    </div>
  );
}
