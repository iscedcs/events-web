import { ExternalFieldsProps } from "@/lib/types/event";
import { LuImage } from "react-icons/lu";

export default function ImageField({
  onChange,
  placeholder,
  value,
}: ExternalFieldsProps) {
  return (
    <div className="bg-secondary relative h-[400px] w-full rounded-[24px]">
      <div className="absolute mr-[10px] mb-[10px] right-0 bottom-0 bg-white w-[50px] h-[50px] rounded-full">
        <div className="relative flex items-center justify-center w-full h-full">
          <LuImage className="w-[25px] h-[25px] text-secondary" />
        </div>
      </div>
    </div>
  );
}
