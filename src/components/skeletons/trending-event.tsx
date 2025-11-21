import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export function TrendingEventsSkeleton() {
  return (
    <div className="">
      <ScrollArea className="mt-[20px]">
        <div className="w-[900px] grid grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="">
                <Skeleton className="w-[90px] h-[90px] rounded-[20px]" />
              </div>
              <div className="text-[16px] space-y-1">
                <Skeleton className="h-[16px] w-[120px]" />
                <Skeleton className="h-[16px] w-[100px]" />
                <Skeleton className="h-[16px] w-[90px]" />
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
