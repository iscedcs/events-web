import Header from "@/components/shared/layout/header";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getCurrentUser } from "../../../../../../actions/auth";
import { getActiveUniqueCategories } from "../../../../../../actions/categories";
import { getUserByID } from "../../../../../../actions/user";

export default async function Categories() {
	const me = await getCurrentUser();
	const userId = me?.id ?? "";

	const user = userId ? await getUserByID(userId) : null;

	const category: string[] = await getActiveUniqueCategories();

	return (
		<div>
			<Header hasBack title="Categories" user={user} />
			<div className=" py-[60px] px-[10px]">
				{category.map((item, k) => (
					<Link
						href={`/user/events?tab=discover&category=${item}`}
						key={k}
						className=" border-b-accent flex items-center justify-between py-[20px] border-b "
					>
						<p>{item}</p>
						<ChevronRight
							className=" text-accent"
							strokeWidth={1.25}
						/>
					</Link>
				))}
			</div>
		</div>
	);
}
