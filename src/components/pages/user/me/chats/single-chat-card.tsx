import { MoveRight, UserRound } from "lucide-react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";

export default function SingleChatCard({ isPrivate }: { isPrivate: boolean }) {
  if (isPrivate) {
    return (
      <Link href={""}>
        <div className=" w-full bg-secondary py-[10px] px-[10px] rounded-[10px]">
          <div className=" w-full flex items-center flex-row gap-2">
            <div className=" w-[50px] h-[50px] rounded-full flex items-center justify-center bg-accent">
              <FaUser className=" text-secondary" />
            </div>
            <div className=" w-[80%] flex flex-row items-center justify-between">
              <div className="">
                <p>Divine Onyekachukwu</p>
                <p className=" text-[13px] text-accent">
                  Event: Ade's Birthday Party
                </p>
              </div>
              <MoveRight />
            </div>
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link href={""}>
      <div className=" w-full bg-secondary py-[10px] px-[10px] rounded-[10px]">
        <div className=" w-full flex items-center flex-row gap-2">
          <div className=" w-[50px] h-[50px] rounded-full flex items-center justify-center bg-accent">
            <MdGroups2 className=" text-secondary w-7 h-7" />
          </div>
          <div className=" w-[80%] flex flex-row items-center justify-between">
            <div className="">
              <p>Ade's Birthday Party</p>
              <p className=" text-[13px] text-accent">200 participants</p>
            </div>
            <MoveRight />
          </div>
        </div>
      </div>
    </Link>
  );
}
