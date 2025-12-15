"use client";

import { useEffect, useMemo, useState } from "react";
import { useNotificationsSocket } from "@/hooks/useNotificationsSocket";
import { NotificationProps } from "@/lib/types/notifications";

interface Props {
	token: string; // JWT from your auth provider
}

export function NotificationsListener({ token }: Props) {
	const [notifications, setNotifications] = useState<NotificationProps[]>([]);
	const [unreadCount, setUnreadCount] = useState<number>(0);

	const audio = useMemo(() => {
		if (typeof window === "undefined") return null;
		return new Audio("/resources/notification.mp3");
	}, []);

	useNotificationsSocket({
		token,
		onNewNotification: (notification) => {
			setNotifications((prev) => [
				notification as NotificationProps,
				...prev,
			]);
			setUnreadCount((prev) => prev + (notification.read ? 0 : 1));

			if (audio) {
				audio.currentTime = 0;
				audio.play().catch((err) => {
					console.warn("Failed to play notification sound", err);
				});
			}

			if (Notification.permission === "granted") {
				new Notification(notification.title, {
					body: notification.body,
				});
			}
		},
		onUnreadCount: (count) => {
			setUnreadCount(count);
		},
	});

	useEffect(() => {
		if (typeof window === "undefined") return;
		if (Notification.permission === "default") {
			Notification.requestPermission().catch(() => {});
		}
	}, []);

	return null; // Attach your own UI component here if desired
}
