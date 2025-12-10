"use client";

import { Share2 } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

export default function ShareButton({
	url,
	title,
	description,
}: {
	url: string;
	title: string;
	description: string;
}) {
	const pathName = usePathname();

	const shareData = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: title,
					text: description,
					url: url,
				});
				console.log("Shared successfully");
			} catch (err: any) {
				console.error("Share failed:", err.message);
			}
		} else {
			alert("Web Share API is not supported in your browser.");
		}
	};
	return (
		<div onClick={shareData} className="">
			<Share2 className=" w-6 h-6" />
		</div>
	);
}
