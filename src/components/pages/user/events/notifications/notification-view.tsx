"use client";

import React, { useEffect, useState, useCallback } from "react";
import { BellRing } from "lucide-react";

import { NotificationProps } from "@/lib/types/notifications";
import { getAllUserNotifications } from "../../../../../../actions/notifications";
import { useNotificationsSocket } from "@/hooks/useNotificationsSocket";

import SingleNotificationCard from "./single-notification-card";
import NotificationsView from "@/components/skeletons/notifications-view";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthInfo } from "@/hooks/use-auth-info";

export default function NotificationView() {
	const { auth } = useAuthInfo();

	const [loading, setLoading] = useState(true);
	const [notifications, setNotifications] = useState<NotificationProps[]>([]);
	const [activeTab, setActiveTab] = useState<
		"all" | "CHAT_MESSAGE" | "EVENT"
	>("all");

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const response = await getAllUserNotifications({});

			if (response) {
				setNotifications(response.records);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	const handleNewNotification = useCallback(
		(notification: NotificationProps) => {
			setNotifications((prev) => {
				// prevent duplicates
				if (prev.some((n) => n.id === notification.id)) {
					return prev;
				}
				return [notification, ...prev];
			});
		},
		[]
	);

	useNotificationsSocket({
		token: auth?.accessToken ?? null,
		onNewNotification: handleNewNotification,
	});

	const filteredNotifications = notifications.filter((n) => {
		if (activeTab === "all") return true;
		if (activeTab === "CHAT_MESSAGE") {
			return n.type === "CHAT_MESSAGE";
		}

		if (activeTab === "EVENT") {
			return n.type === "EVENT_REMINDER" || n.type === "EVENT_STARTING";
		}

		return false;
	});

	if (loading) {
		return <NotificationsView />;
	}

	if (notifications.length === 0) {
		return (
			<div className="h-[calc(100svh-55px)] flex items-center flex-col justify-center">
				<BellRing className="text-accent w-20 h-20" />
				<p>You do not have any notifications</p>
			</div>
		);
	}

	return (
		<div>
			<Tabs
				defaultValue="all"
				onValueChange={(v) =>
					setActiveTab(
						v === "all" ? "all" : (v as "CHAT_MESSAGE" | "EVENT")
					)
				}
			>
				<TabsList className="w-full flex justify-between bg-black">
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value="CHAT_MESSAGE">Chats</TabsTrigger>
					<TabsTrigger value="EVENT">Event Reminders</TabsTrigger>
				</TabsList>
			</Tabs>

			<div className="mt-3 flex flex-col gap-3">
				{filteredNotifications.map((item) => (
					<SingleNotificationCard key={item.id} {...item} />
				))}
			</div>
		</div>
	);
}
