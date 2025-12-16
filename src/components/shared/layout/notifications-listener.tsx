"use client";

import { useEffect, useRef, useState } from "react";
import { useNotificationsSocket } from "@/hooks/useNotificationsSocket";
import { NotificationProps } from "@/lib/types/notifications";

export function NotificationsListener({ token }: { token: string }) {
	const [unreadCount, setUnreadCount] = useState(0);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;

		try {
			audioRef.current = new Audio("/sounds/notification.mp3");
			audioRef.current.preload = "auto";
		} catch {}
	}, []);

	useNotificationsSocket({
		token,
		onNewNotification: (notification) => {
			setUnreadCount((prev) => prev + (notification.read ? 0 : 1));

			// 🔊 Sound
			try {
				const audio = audioRef.current;
				if (audio) {
					audio.currentTime = 0;
					audio.play().catch(() => {});
				}
			} catch {}

			// 🔔 Browser notification
			try {
				if (
					"Notification" in window &&
					Notification.permission === "granted"
				) {
					new Notification(notification.title, {
						body: notification.body,
					});
				}
			} catch {}
		},

		onUnreadCount: setUnreadCount,
	});

	useEffect(() => {
		if (
			typeof window !== "undefined" &&
			"Notification" in window &&
			Notification.permission === "default"
		) {
			Notification.requestPermission().catch(() => {});
		}
	}, []);

	return null;
}
