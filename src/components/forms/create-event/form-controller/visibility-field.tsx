"use client";

import React from "react";
import { BsGlobe } from "react-icons/bs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExternalFieldsProps } from "@/lib/types/event";

export default function VisibilityField({
  onChange,
  value,
  placeholder,
}: ExternalFieldsProps) {
  return (
    <Select
      onValueChange={onChange}
      value={value !== undefined ? String(value) : undefined}
    >
      <SelectTrigger className="bg-secondary border-0 text-white px-3 py-5 rounded-[12px] flex items-center gap-2">
        <BsGlobe className="w-[18px] h-[18px]" />
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="w-[80%] rounded-2xl px-4 py-3 text-white border-0 bg-secondary">
        <div className="flex flex-col gap-1">
          <SelectItem value="false" className="pl-0 text-[16px]">
            Private
          </SelectItem>
        </div>

        <div className="flex flex-col gap-1 mt-5">
          <SelectItem value="true" className="pl-0 text-[16px]">
            Public
          </SelectItem>
          <p className="text-[13px] text-accent">
            Shown on your calendar and eligible to be featured
          </p>
        </div>
      </SelectContent>
    </Select>
  );
}
