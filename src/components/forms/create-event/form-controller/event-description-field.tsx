import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ExternalFieldsProps } from "@/lib/types/event";
import React from "react";
import { HiOutlineDocumentText } from "react-icons/hi";

export default function EventDescriptionField({
  onChange,
  value,
  placeholder,
}: ExternalFieldsProps) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className=" mt-[20px]">
            <div className=" bg-secondary rounded-[12px] py-[20px] px-[15px]">
              <div className=" flex items-center gap-3  ">
                <HiOutlineDocumentText className=" text-accent w-[20px] h-[20px]" />
                <div className=" w-[250px]">
                  <p className=" truncate">
                    {value ? value : "Add Description"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="p-[13px]  w-full border-0 bg-secondary">
          <DialogTitle hidden>Content</DialogTitle>
          <div className=" w-full">
            <p>Event Description</p>
            <Textarea
              value={value?.toString() || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="focus-visible:ring-0 border border-[#2a2a2a] rounded-[8px] h-[300px] mt-[10px] w-full break-all bg-[#151515] resize-none overflow-hidden"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
