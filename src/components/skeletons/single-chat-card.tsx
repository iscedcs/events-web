import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SingleChatCardSkeleton() {
  return (
    <div className=" flex flex-col gap-4">
      <Skeleton className="w-full h-15" />
      <Skeleton className="w-full h-15" />
      <Skeleton className="w-full h-15" />
      <Skeleton className="w-full h-15" />
      <Skeleton className="w-full h-15" />
      <Skeleton className="w-full h-15" />
      <Skeleton className="w-full h-15" />
    </div>
  );
}
