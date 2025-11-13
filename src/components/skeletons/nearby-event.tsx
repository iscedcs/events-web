import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function NearbyEventSkeleton() {
  return (
    <>
      <div>
        <div className=" flex gap-2">
          <Skeleton className="w-30 h-4" />
          <Skeleton className="w-12 h-4" />
        </div>
        <div className=" mt-[15px]">
          <Skeleton className="w-full h-52" />
        </div>
      </div>
      <div>
        <div className=" flex gap-2">
          <Skeleton className="w-30 h-4" />
          <Skeleton className="w-12 h-4" />
        </div>
        <div className=" mt-[15px]">
          <Skeleton className="w-full h-52" />
        </div>
      </div>
      <div>
        <div className=" flex gap-2">
          <Skeleton className="w-30 h-4" />
          <Skeleton className="w-12 h-4" />
        </div>
        <div className=" mt-[15px]">
          <Skeleton className="w-full h-52" />
        </div>
      </div>
      <div>
        <div className=" flex gap-2">
          <Skeleton className="w-30 h-4" />
          <Skeleton className="w-12 h-4" />
        </div>
        <div className=" mt-[15px]">
          <Skeleton className="w-full h-52" />
        </div>
      </div>
    </>
  );
}
