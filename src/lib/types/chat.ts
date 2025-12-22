import { SingleAttendeeProps } from "./attendee";
import { SingleEventProps } from "./event";

export interface SingleChatroomProps {
	id: string;
	event_id: string;
	event_name: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
	isPrivate: boolean;
	participantA: string;
	participantB: string;
	creatorId: string;
}

export interface SingleMessageProps {
	// isSender: boolean;
	// name: string;
	// time: string;
	// message: string;
	// isHost: boolean;

	message: SingleChatMessageProps;
	isCurrentUser: boolean;
	// showAvatar?: boolean;
	onRetry?: (message: SingleChatMessageProps) => void;
	onPrivateChat: (
		userType: "host" | "attendee",
		participantA: string
	) => void;
	onEditMessage: (id: string, newMessage: string) => void;
	onDeleteMessage: (id: string) => void;
	isPrivate: boolean;
	attendee: SingleAttendeeProps | undefined;
	// isUpdated: boolean;
}

export interface SingleChatMessageProps {
	id: string;
	tempId?: string;
	chatType?: string;
	eventId?: string;
	attendee_id: string | null | undefined;
	sender: {
		id: string;
		name: string;
		displayPicture?: string;
	};
	message: string;
	type: string;
	timestamp: string;
	status?: "sending" | "sent" | "failed";
	meta?: any;
	isFromCreator?: boolean;
	creator_id: string;
	updatedAt: string | null | undefined;
	deletedAt: string | null | undefined;
	createdAt: string | null | undefined;
}

export interface SingleChatRoomComponentProps {
	event: SingleEventProps;
	chatRoomId: string;
	attendee: SingleAttendeeProps | undefined;
	chatRoomType?: "group" | "private";
}

export interface ChatInputProps {
	onSendMessage: (
		message: string,
		type?: "text" | "audio" | "image" | "link"
	) => Promise<void>;
	disabled?: boolean;
	placeholder?: string;
	onTyping?: (isTyping: boolean) => void;
}

export interface SinglePrivateChatroomProps {
	chatRoomId: string;
	eventId: string;
	eventName: string;
	eventTitle: string;
	isPrivate: boolean;
	participantA: {
		id: string;
		name: string;
		displayPicture: string;
		attendeeId: string;
	};
	participantB: {
		id: string;
		name: string;
		displayPicture: string;
		attendeeId: string;
	};
	creatorId: string;
	createdAt: Date;
	updatedAt: Date;
}
