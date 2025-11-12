"use client";

import { ACCOUNTSETTINGS } from "@/lib/const";
import { UserProps } from "@/lib/types/user";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function AccountSettings({
  user,
}: {
  user: UserProps | null | undefined;
}) {
  const router = useRouter();
  return (
    <div className=" flex gap-6 mt-[20px] flex-col ">
      {ACCOUNTSETTINGS.map((item, k) => {
        const handleRedirect = () => {
          router.push(item.path);
        };
        return (
          <div
            onClick={handleRedirect}
            key={k}
            className="  flex items-center justify-between "
          >
            <div className=" flex items-center gap-5">
              <span>{item.icon}</span>
              <p className=" text-[20px]">{item.label}</p>
            </div>
            <ChevronRight />
          </div>
        );
      })}
    </div>
  );
}
