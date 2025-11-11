import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export default function ChatroomSkeleton() {
  const skeletonMessages = Array.from({ length: 5 }).map((_, i) => ({
    id: `skeleton-${i}`,
    isCurrentUser: i % 2 === 0,
  }));

  return (
    <div className="relative h-[calc(100svh-55px)] py-[5px] px-[10px]">
      <div className=" flex gap-4 flex-col">
        <div className=" flex gap-2">
          <Skeleton className=" w-[30px] rounded-full h-[30px]" />
          <Skeleton className=" w-[80%] h-[60px] text-[12px] mt-[3px] rounded-tl-[0px]  px-[25px] rounded-r-[20px] rounded-bl-[20px] py-[12px]" />
        </div>
        <div className=" flex  flex-row-reverse gap-2">
          <Skeleton className=" w-[80%] h-[50px] text-[12px] mt-[3px] rounded-tr-[0px]  px-[25px] rounded-l-[20px] rounded-br-[20px] py-[12px]" />
        </div>
        <div className=" flex  flex-row-reverse gap-2">
          <Skeleton className=" w-[30%] h-[50px] text-[12px] mt-[3px] rounded-tr-[0px]  px-[25px] rounded-l-[20px] rounded-br-[20px] py-[12px]" />
        </div>
        <div className=" flex gap-2">
          <Skeleton className=" w-[30px] rounded-full h-[30px]" />
          <Skeleton className=" w-[80%] h-[60px] text-[12px] mt-[3px] rounded-tl-[0px]  px-[25px] rounded-r-[20px] rounded-bl-[20px] py-[12px]" />
        </div>
        <div className=" flex gap-2">
          <Skeleton className=" w-[30px] rounded-full h-[30px]" />
          <Skeleton className=" w-[50%] h-[60px] text-[12px] mt-[3px] rounded-tl-[0px]  px-[25px] rounded-r-[20px] rounded-bl-[20px] py-[12px]" />
        </div>
        <div className=" flex  flex-row-reverse gap-2">
          <Skeleton className=" w-[60%] h-[60px] text-[12px] mt-[3px] rounded-tr-[0px]  px-[25px] rounded-l-[20px] rounded-br-[20px] py-[12px]" />
        </div>
        <div className=" flex  flex-row-reverse gap-2">
          <Skeleton className=" w-[80%] h-[60px] text-[12px] mt-[3px] rounded-tr-[0px]  px-[25px] rounded-l-[20px] rounded-br-[20px] py-[12px]" />
        </div>
      </div>

      {/* Input skeleton */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 px-[10px]">
        <div className="flex gap-2 items-end">
          <Skeleton className="flex-1 h-10 rounded-[8px]" />
          <Skeleton className="w-10 h-10 rounded-full " />
        </div>
      </div>
    </div>
  );
}
