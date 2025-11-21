"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

interface SocketOptions {
  token: string;
  onMessage?: (message: any) => void;
  onUserJoined?: (data: any) => void;
  onUserLeft?: (data: any) => void;
  onTyping?: (data: any) => void;
  onMessageSeen?: (data: any) => void;
  onRecentMessages?: (data: any) => void;
  onError?: (err: any) => void;
}

export const useChatSocket = ({
  token,
  onMessage,
  onUserJoined,
  onUserLeft,
  onTyping,
  onMessageSeen,
  onRecentMessages,
  onError,
}: SocketOptions) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Use refs for callbacks to avoid recreating socket connection
  const onMessageRef = useRef(onMessage);
  const onUserJoinedRef = useRef(onUserJoined);
  const onUserLeftRef = useRef(onUserLeft);
  const onTypingRef = useRef(onTyping);
  const onMessageSeenRef = useRef(onMessageSeen);
  const onRecentMessagesRef = useRef(onRecentMessages);
  const onErrorRef = useRef(onError);

  // Update refs when callbacks change
  useEffect(() => {
    onMessageRef.current = onMessage;
    onUserJoinedRef.current = onUserJoined;
    onUserLeftRef.current = onUserLeft;
    onTypingRef.current = onTyping;
    onMessageSeenRef.current = onMessageSeen;
    onRecentMessagesRef.current = onRecentMessages;
    onErrorRef.current = onError;
  });

  useEffect(() => {
    if (!token) return;

    // const decoded = jwtDecode<{ id: string }>(token);
    // console.log({ decoded });

    // const userId = decoded.id;

    // console.log({ userId });

    console.log({ token });

    // Connect to the /chat-socket namespace
    const socket = io(
      `${process.env.NEXT_PUBLIC_LIVE_EVENTS_BACKEND_URL}/chat-socket`,
      {
        auth: { token },
        transports: ["websocket"],
        forceNew: true,
      }
    );

    socketRef.current = socket;

    // Connection events
    socket.on("connect", () => {
      console.log("Connected to chat gateway", socket.id);
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from chat gateway");
      setIsConnected(false);
    });

    // Chat events - use refs to avoid dependency issues
    socket.on("newMessage", (message) => {
      console.log("New message received:", message);
      onMessageRef.current?.(message);
    });

    socket.on("userJoined", (data) => {
      console.log("User joined:", data);
      onUserJoinedRef.current?.(data);
    });

    socket.on("userLeft", (data) => {
      console.log("User left:", data);
      onUserLeftRef.current?.(data);
    });

    socket.on("userTyping", (data) => {
      console.log("User typing:", data);
      onTypingRef.current?.(data);
    });

    socket.on("messageSeen", (data) => {
      console.log("Message seen:", data);
      onMessageSeenRef.current?.(data);
    });

    socket.on("recentMessages", (data) => {
      console.log("Recent messages:", data);
      onRecentMessagesRef.current?.(data);
    });

    socket.on("error", (err) => {
      console.error("Socket error:", err);
      onErrorRef.current?.(err);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      setIsConnected(false);
    };
  }, [token]); // Only depend on token

  const joinRoom = useCallback((roomId: string, userId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("joinRoom", { roomId, userId });

      console.log("JOINED ROOM INFO:", { roomId, userId });
    }
  }, []);

  const leaveRoom = useCallback((roomId: string, userId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("leaveRoom", { roomId, userId });
    }
  }, []);

  const sendMessage = useCallback(
    (data: {
      chatRoomId: string;
      id: string;
      message: string;
      type?: string;
      tempId?: string;
      chatType?: string;
      eventId?: string;
      updatedAt: string | null | undefined;
      attendee_id?: string;
      creator_id: string;
      meta?: any;
      deletedAt: string | null | undefined;
      createdAt: string | null | undefined;
      timestamp: string | null | undefined;
      isFromCreator: boolean;
    }) => {
      console.log({ SOCKETSENDMESSAGE: data });
      if (socketRef.current?.connected) {
        socketRef.current.emit("sendMessage", {
          chatRoomId: data.chatRoomId,
          tempId: data.tempId,
          creator_id: data.creator_id,
          userId: data.id,
          message: data.message,
          type: data.type || "text",
          chatType: data.chatType || "group",
          eventId: data.eventId,
          attendee_id: data.attendee_id,
          isFromCreator: data.isFromCreator,
          meta: data.meta,
          updatedAt: data.updatedAt,
          timestamp: data.timestamp,
          deletedAt: data.deletedAt,
          createdAt: data.createdAt,
        });
      }
    },
    []
  );

  const sendTyping = useCallback(
    (chatRoomId: string, userId: string, isTyping: boolean) => {
      if (socketRef.current?.connected) {
        socketRef.current.emit("typing", { chatRoomId, userId, isTyping });

        console.log("TYPING INFO", { chatRoomId, userId, isTyping });
      }
    },
    []
  );

  const markMessageSeen = useCallback(
    (messageId: string, userId: string, chatRoomId: string) => {
      if (socketRef.current?.connected) {
        socketRef.current.emit("messageSeen", {
          messageId,
          userId,
          chatRoomId,
        });
      }
    },
    []
  );

  const getRecentMessages = useCallback(
    (chatRoomId: string, limit?: number, beforeMessageId?: string) => {
      if (socketRef.current?.connected) {
        console.log("RECENT MESSAGES INFO", {
          chatRoomId,
          limit,
          beforeMessageId,
        });
        socketRef.current.emit("getRecentMessages", {
          chatRoomId,
          limit,
          beforeMessageId,
        });
      }
    },
    []
  );

  return {
    socket: socketRef.current,
    isConnected,
    joinRoom,
    leaveRoom,
    sendMessage,
    sendTyping,
    markMessageSeen,
    getRecentMessages,
  };
};
