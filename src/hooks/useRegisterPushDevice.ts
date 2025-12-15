"use client";

import { requestFcmToken } from "@/lib/firebase";
import { useEffect, useState } from "react";

export function useRegisterPushDevice() {
	const [token, setToken] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const register = async () => {
		try {
			setLoading(true);

			if (!("Notification" in window)) return;

			if (Notification.permission === "default") {
				const permission = await Notification.requestPermission();
				if (permission !== "granted") {
					setError("Notification permission not granted");
					return;
				}
			}

			if (Notification.permission !== "granted") return;

			const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!;
			const fcmToken = await requestFcmToken(vapidKey);

			// console.log({ fcmToken });
			if (!fcmToken) {
				setError("Failed to get FCM token");
				return;
			}

			localStorage.setItem("fcmToken", fcmToken);

			setToken(fcmToken);

			// console.log({fcmToken})

			const res = await fetch("/api/notifications/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					fcmToken,
					platform: "web",
					deviceInfo: navigator.userAgent,
				}),
			});

			if (!res.ok) {
				throw new Error("Failed to register device");
			}
		} catch (err: any) {
			setError(err?.message || "Unknown error");
		} finally {
			setLoading(false);
		}
	};

	return { register, fcmToken: token, error, loading };
}
