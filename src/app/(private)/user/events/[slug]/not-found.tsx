"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaBan } from "react-icons/fa";

export default function NotFound() {
	const router = useRouter();
	return (
		<div className=" flex items-center gap-4 flex-col justify-center h-screen px-[15px] py-[20px] ">
			<div className="">
				<FaBan className=" w-[100px] h-[100px]" />
			</div>
			<p>The page you are on does not exist </p>
			<Button
				onClick={() => {
					router.push("/user/events?tab=discover");
				}}
			>
				Discover events
			</Button>
		</div>
	);
}
