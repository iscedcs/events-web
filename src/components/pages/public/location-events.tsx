import { CloudAlert } from "lucide-react";

export default function LocationEvents() {
  return (
    <div className=" flex text-accent mt-[60px] justify-center items-center flex-col px-[10px]">
      <CloudAlert className=" w-[100px] h-[100px]" />
      <p>No events found yet</p>
    </div>
  );
}
