"use client";

import { requestFcmToken } from "@/lib/firebase";
import { useCallback, useState } from "react";

const STORAGE_KEY = "fcmToken";

export function useRegisterPushDevice() {
	const [token, setToken] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const register = useCallback(async () => {
		setError(null);

		try {
			if (!("Notification" in window)) {
				throw new Error(
					"Notifications are not supported on this browser"
				);
			}

			// Avoid duplicate registrations
			const existingToken = localStorage.getItem(STORAGE_KEY);
			if (existingToken) {
				setToken(existingToken);
				return;
			}

			setLoading(true);

			// Handle permission flow
			if (Notification.permission === "default") {
				const permission = await Notification.requestPermission();
				if (permission !== "granted") {
					throw new Error("Notification permission not granted");
				}
			}

			if (Notification.permission === "denied") {
				throw new Error(
					"Notifications are blocked. Enable them in your browser settings."
				);
			}

			// Ensure service worker is registered
			if (!("serviceWorker" in navigator)) {
				throw new Error("Service workers are not supported");
			}

			await navigator.serviceWorker.register("/firebase-messaging-sw.js");

			const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
			if (!vapidKey) {
				throw new Error("Missing Firebase VAPID key");
			}

			// Get FCM token
			const fcmToken = await requestFcmToken(vapidKey);

			if (!fcmToken) {
				throw new Error("Failed to obtain FCM token");
			}

			// Register with backend
			const res = await fetch("/api/notifications/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fcmToken,
					platform: "web",
					deviceInfo: navigator.userAgent,
				}),
			});

			if (!res.ok) {
				throw new Error("Failed to register device on server");
			}

			// Persist only after success
			localStorage.setItem(STORAGE_KEY, fcmToken);
			setToken(fcmToken);
		} catch (err: any) {
			setError(err?.message ?? "Something went wrong");
		} finally {
			setLoading(false);
		}
	}, []);

	const unregister = useCallback(async () => {
		try {
			const storedToken = localStorage.getItem(STORAGE_KEY);
			if (!storedToken) return;

			await fetch("/api/notifications/unregister", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fcmToken: storedToken }),
			});

			localStorage.removeItem(STORAGE_KEY);
			setToken(null);
		} catch {
			// intentionally silent
		}
	}, []);

	return {
		register,
		unregister,
		fcmToken: token,
		error,
		loading,
	};
}
