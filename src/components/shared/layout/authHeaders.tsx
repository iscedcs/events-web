import { AuthHeaderType } from "@/lib/types/auth";
import { IoIosInformationCircle } from "react-icons/io";

export default function AuthHeader({
  hasLink,
  message,
  link,
  linkText,
}: AuthHeaderType) {
  return (
    <div className=" bg-secondary w-full fixed z-20 flex gap-2.5 p-2.5 items-center ">
      <IoIosInformationCircle className=" w-7 h-7" />
      <p className=" text-[12px]">{message}</p>
    </div>
  );
}
