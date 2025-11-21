import { Skeleton } from "../ui/skeleton";

export default function UpcomingEventSkeleton() {
  return (
    <div>
      <div className="">
        <div className="mt-[10px] bg-secondary p-[20px] w-full rounded-[20px]">
          <div className="flex flex-col gap-3">
            <Skeleton className="w-[90px] h-[90px] rounded-[20px]" />

            <div className="text-[16px] mt-[10px] space-y-2">
              <div className="flex gap-2 items-center">
                <Skeleton className="h-[19px] w-[120px]" />
                <Skeleton className="h-[19px] w-[8px]" />
                <Skeleton className="h-[19px] w-[60px]" />
              </div>

              <Skeleton className="h-[19px] w-[200px]" />

              <Skeleton className="h-[19px] w-[150px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
