import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function SingleEventCardSkeleton() {
  return (
    <div className=" flex items-center flex-col gap-4 pb-[20px]">
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
    </div>
  );
}
