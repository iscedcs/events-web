import { Button } from "@/components/ui/button";
import { Dog } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function UpdateDisplay() {
	return (
		<div className=" flex items-center flex-col h-[100svh] justify-center">
			<Dog className=" w-[100px] h-[100px]" />
			<p className=" text-[20px]">We’re still building this part</p>
			<p className=" text-accent">
				It’s currently held together with hopes and prayers
			</p>
			<Button asChild className=" mt-[10px]">
				<Link href={"/user/events?tab=discover"}>Discover Events</Link>
			</Button>
		</div>
	);
}
