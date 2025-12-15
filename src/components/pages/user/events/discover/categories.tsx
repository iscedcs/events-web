"use client";

import { CategoriesSkeleton } from "@/components/skeletons/category";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { getActiveUniqueCategories } from "../../../../../../actions/categories";

type SearchParams = {
	category: string;
};
export default function Categories(searchParams: {
	searchParams: SearchParams;
}) {
	const [category, setCategory] = useState<string[]>([]);
	const [loading, setIsLoading] = useState(true);

	// console.log({ searchParams });

	useEffect(() => {
		setIsLoading(true);
		const fetchCategory = async () => {
			try {
				const category = await getActiveUniqueCategories(9);
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
						<div className=" text-accent ">
							No featured categories yet
						</div>
					) : (
						<ScrollArea>
							<div className=" gap-3 flex-row w-[30rem] flex-wrap flex">
								{category?.map((category, k) => (
									<div key={k}>
										<Link
											href={`/user/events?tab=discover&category=${category}`}
											key={k}
											className={`${
												searchParams.searchParams
													.category === category
													? " text-secondary bg-white"
													: " bg-secondary"
											}   flex items-center gap-2 px-[13px] rounded-full py-[10px]`}
										>
											<div
												className={`${
													searchParams.searchParams.category.toLowerCase() ===
													category.toLowerCase()
														? " bg-secondary"
														: "bg-[#D9D9D9]"
												} w-[20px] rounded-full  h-[20px] `}
											></div>
											<p className=" text-[14px]">
												{category}
											</p>
										</Link>
									</div>
								))}
								{searchParams.searchParams.category === "" ? (
									<>
										{category?.length === 9 && (
											<Link
												href={"/user/events/categories"}
												className=" bg-white text-black   flex items-center gap-2 px-[13px] rounded-full py-[10px]"
											>
												<p className=" text-[14px]">
													{"View More"}
												</p>
											</Link>
										)}
									</>
								) : (
									<Link
										href={"/user/events?tab=discover"}
										className=" bg-error text-white   flex items-center gap-2 px-[13px] rounded-full py-[10px]"
									>
										<MdCancel />
										<p className=" text-[14px]">
											{"Close Category"}
										</p>
									</Link>
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
