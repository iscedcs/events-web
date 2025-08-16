import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoriesSkeleton() {
  return (
    <ScrollArea>
      <div className="gap-3 flex-row flex-wrap w-[580rem] flex">
        {Array.from({ length: 10 }).map((_, k) => (
          <div
            key={k}
            className="bg-secondary flex items-center gap-2 px-[13px] rounded-full py-[10px]"
          >
            <Skeleton className="w-[20px] rounded-full h-[20px]" />
            <Skeleton className="h-[14px] w-16" />
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
