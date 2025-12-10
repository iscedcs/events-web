"use client";

import { Share2 } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

export default function ShareButton() {
	const pathName = usePathname();

	const shareData = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: "GADA",
					text: "Discover and attend amazing events on GADA!",
					url: pathName,
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
		<div
			onClick={shareData}
			className=" py-[13px] border shadow px-[13px] rounded-full mb-[30px] mr-[30px] fixed bottom-0 bg-secondary right-0"
		>
			<Share2 className=" w-3 h-3" />
		</div>
	);
}
