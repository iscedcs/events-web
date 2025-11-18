import { SingleAttendeeProps, SingleEventProps } from "./event";

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
  onPrivateChat?: (userId: string) => void;
  onEditMessage: (id: string, newMessage: string) => void;
  onDeleteMessage: (id: string) => void;
  // isUpdated: boolean;
}

export interface SingleChatMessageProps {
  id: string;
  tempId?: string;
  chatType?: string;
  eventId?: string;
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
