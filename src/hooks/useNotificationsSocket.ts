"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface NotificationPayload {
	id: string;
	userId: string;
	title: string;
	body: string;
	type: "CHAT_MESSAGE" | "EVENT_REMINDER" | "EVENT_STARTING" | "SYSTEM";
	data?: Record<string, any>;
	read: boolean;
	createdAt: string;
	updatedAt: string;
	deletedAt?: string | null;
}

interface UseNotificationsSocketOptions {
	token: string | null; // JWT from your auth system
	onNewNotification?: (notification: NotificationPayload) => void;
	onUnreadCount?: (count: number) => void;
}

export function useNotificationsSocket({
	token,
	onNewNotification,
	onUnreadCount,
}: UseNotificationsSocketOptions) {
	const socketRef = useRef<Socket | null>(null);

	useEffect(() => {
		if (!token) return;

		const socket = io(
			process.env.NEXT_PUBLIC_LIVE_EVENTS_BACKEND_URL + "/notifications-socket",
			{
				auth: { token },
				transports: ["websocket"],
			}
		);

		socketRef.current = socket;

		socket.on("connect", () => {
			socket.emit("subscribe");
		});

		socket.on("notification:new", (notification: NotificationPayload) => {
			onNewNotification?.(notification);
		});

		socket.on("notification:unread-count", (payload: { count: number }) => {
			onUnreadCount?.(payload.count);
		});

		socket.on("connect_error", (err) => {
			console.error("Notifications socket connection error", err.message);
		});

		return () => {
			socket.emit("unsubscribe");
			socket.disconnect();
			socketRef.current = null;
		};
	}, [token, onNewNotification, onUnreadCount]);

	return socketRef;
}
