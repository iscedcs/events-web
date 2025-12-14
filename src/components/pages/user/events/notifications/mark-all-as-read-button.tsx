"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getUnreadNotificationsCount } from "../../../../../../actions/notifications";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function MarkAllAsRead() {
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const handleClick = async () => {
		setLoading(true);
		const [markAll] = await Promise.all([
			await fetch("/api/notifications/mark-all-as-read", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				cache: "no-store",
			}),
		]);

		const data = await markAll.json();
		if (markAll.ok) {
			setLoading(false);
			window.location.reload();
			toast.success("All notifications have been marked as read");
		} else {
			setLoading(false);
			window.location.reload();
			toast.error("Something went wrong");
		}
	};
	return (
		<div className=" fixed left-0 px-[15px] bottom-0 mb-[30px] w-full">
			<Button
				disabled={loading}
				onClick={handleClick}
				className="w-full rounded-[12px] font-semibold py-[24px]"
			>
				Mark all as read
			</Button>
		</div>
	);
}
