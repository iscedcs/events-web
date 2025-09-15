import { Skeleton } from "@/components/ui/skeleton";

export default function EventCardSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex gap-2 items-start">
            <Skeleton className="w-12 h-8" />
            <Skeleton className="w-8 h-4 mt-1" />
          </div>
          <Skeleton className="mt-[10px] w-16 h-5" />
        </div>
        <Skeleton className="w-20 h-9" />
      </div>

      <div className="relative mt-[10px]">
        <Skeleton className="w-full h-[300px] rounded-[24px]" />
      </div>

      <div className="mt-[10px] flex items-center gap-2">
        <Skeleton className="w-[8px] h-[8px] rounded-full" />
        <Skeleton className="w-32 h-3" />
      </div>

      <div className="mt-[10px]">
        <Skeleton className="w-48 h-6" />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex mt-[10px] items-center gap-3">
          <Skeleton className="w-[30px] h-[30px] rounded-full" />
          <div>
            <Skeleton className="w-16 h-3 mb-1" />
            <Skeleton className="w-24 h-4" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="w-5 h-5" />
          <Skeleton className="w-5 h-5" />
          <Skeleton className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
