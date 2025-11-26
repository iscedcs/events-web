import { Input } from "@/components/ui/input";
import { UserProps } from "@/lib/types/user";
import { BiRename } from "react-icons/bi";

export default function EditUserForm({
  user,
}: {
  user: UserProps | null | undefined;
}) {
  return (
    <div>
      {/* <p className=" text-[24px] font-bold">Edit your profile.</p> */}
      <div className=" relative">
        <BiRename className=" top-1/2 -translate-y-1/2  absolute w-[24px] h-[24px]" />
        <Input
          placeholder={"First name"}
          className=" pl-[30px] placeholder:font-bold rounded-none py-[30px] border-t-0 border-l-0 border-r-0"
        />
      </div>

      <div className=" relative">
        <BiRename className=" top-1/2 -translate-y-1/2  absolute w-[24px] h-[24px]" />
        <Input
          placeholder={"Last name"}
          className=" pl-[30px] placeholder:font-bold rounded-none py-[30px] border-t-0 border-l-0 border-r-0"
        />
      </div>
    </div>
  );
}
