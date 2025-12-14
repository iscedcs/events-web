"use client";

import { Button } from "@/components/ui/button";
import { useRegisterPushDevice } from "@/hooks/useRegisterPushDevice";
import Image from "next/image";
import { useEffect, useState } from "react";

const STORAGE_KEY = "notifications_prompt_last_seen";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export default function EnableNotificationsCard() {
	const { register, loading } = useRegisterPushDevice();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (
				"Notification" in window &&
				Notification.permission === "denied"
			) {
				return;
			}
		}

		const lastSeen = localStorage.getItem(STORAGE_KEY);

		if (!lastSeen) {
			setVisible(true);
			return;
		}

		const elapsed = Date.now() - Number(lastSeen);

		if (elapsed >= ONE_DAY_MS) {
			setVisible(true);
		}
	}, []);

	if (!visible) return null;

	const dismiss = () => {
		localStorage.setItem(STORAGE_KEY, Date.now().toString());
		setVisible(false);
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
			<div className="w-[90%] rounded-[30px] bg-secondary p-5">
				<p className="text-center text-[20px] font-bold">
					Enable notifications
				</p>

				<p className="text-center text-[12px] text-accent">
					Get chat updates, event reminders and product updates
				</p>

				<Image
					src="/resources/3d-notification-bell.png"
					alt="Notifications"
					width={400}
					height={400}
					priority
				/>

				<Button
					onClick={async () => {
						await register();
						dismiss();
					}}
					disabled={loading}
					className="w-full rounded-[12px] py-6 font-semibold"
				>
					Enable notifications
				</Button>

				<button
					onClick={dismiss}
					className="mt-3 w-full text-center text-xs text-muted-foreground"
				>
					Maybe later
				</button>

				<p className="mt-2 text-center text-[10px] text-error">
					No spam. You can turn this off anytime.
				</p>
			</div>
		</div>
	);
}
