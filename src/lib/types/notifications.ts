export interface NotificationProps {
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

export interface SingleNotificationCardProps
	extends Pick<
		NotificationProps,
		"body" | "title" | "type" | "read" | "data" | "createdAt" | "id"
	> {}
