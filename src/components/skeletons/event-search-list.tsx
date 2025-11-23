import { Skeleton } from "../ui/skeleton";

export default function EventSearchList() {
  return (
    <div className=" flex gap-5 flex-col">
      <Skeleton className="h-[170px] rounded-[20px]" />
      <Skeleton className="h-[170px] rounded-[20px]" />
      <Skeleton className="h-[170px] rounded-[20px]" />
      <Skeleton className="h-[170px] rounded-[20px]" />
      <Skeleton className="h-[170px] rounded-[20px]" />
    </div>
  );
}
