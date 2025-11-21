import { Input } from "@/components/ui/input";
import { ExternalFieldsProps } from "@/lib/types/event";

export default function TitleField({
  onChange,
  value,
  placeholder,
}: ExternalFieldsProps) {
  return (
    <div className=" mt-[20px]">
      <Input
        className=" text-[32px] capitalize border-0 rounded-none"
        value={value?.toString().toLowerCase() || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
