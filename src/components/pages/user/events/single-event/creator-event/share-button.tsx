"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

export default function ShareButton({
  eventTitle,
  text,
}: {
  eventTitle: string;
  text: string;
}) {
  const pathName = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  //   console.log({ pathName });

  const shareData = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          text: text,
          title: `Event: ${eventTitle}`,
          url: pathName,
        });
        console.log("Shared successfully");
      } catch (err: any) {
        console.error("Share failed:", err.message);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };
  return (
    <div>
      <Button onClick={shareData} className=" mt-[10px]">
        <Share2 />
        <p>Share event</p>
      </Button>
    </div>
  );
}
