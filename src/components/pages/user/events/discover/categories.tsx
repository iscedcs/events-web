"use client";

import { CategoriesSkeleton } from "@/components/skeletons/category";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { getUniqueCategories } from "../../../../../../actions/categories";

export default function Categories() {
  const [category, setCategory] = useState<string[]>([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchCategory = async () => {
      try {
        const category = await getUniqueCategories();
        if (category === undefined) {
          setIsLoading(false);
        } else {
          setCategory(category);
          setIsLoading(false);
        }
      } catch (e: any) {
        setIsLoading(false);
      }
    };
    fetchCategory();
  }, []);

  // console.log({ category });
  return (
    <>
      {loading === true ? (
        <CategoriesSkeleton />
      ) : (
        <>
          {category?.length === 0 || category === undefined ? (
            <div className=" text-accent ">No featured categories yet</div>
          ) : (
            <ScrollArea>
              <div className=" gap-3 flex-row w-[30rem] flex-wrap flex">
                {category?.map((category, k) => (
                  <div key={k}>
                    <div
                      key={k}
                      className=" bg-secondary   flex items-center gap-2 px-[13px] rounded-full py-[10px]"
                    >
                      <div className=" w-[20px] rounded-full  h-[20px] bg-[#D9D9D9]"></div>
                      <p className=" text-[14px]">{category}</p>
                    </div>
                  </div>
                ))}
                {category?.length === 9 && (
                  <div className=" bg-secondary   flex items-center gap-2 px-[13px] rounded-full py-[10px]">
                    <p className=" text-[14px]">{"View More"}</p>
                  </div>
                )}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}
        </>
      )}
    </>
  );
}
