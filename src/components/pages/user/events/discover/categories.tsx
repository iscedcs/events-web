import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CATEGORIES } from "@/lib/const";

export default function Categories() {
  return (
    <ScrollArea>
      <div className=" gap-3 flex-row flex-wrap w-[580rem] flex">
        {CATEGORIES.map((category, k) => (
          <div
            key={k}
            className=" bg-secondary   flex items-center gap-2 px-[13px] rounded-full py-[10px]"
          >
            <div className=" w-[20px] rounded-full  h-[20px] bg-[#D9D9D9]"></div>
            <p className=" text-[14px]">{category.name}</p>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
