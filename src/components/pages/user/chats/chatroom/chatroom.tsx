"use client";

import ChatroomSkeleton from "@/components/skeletons/chat-room";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAuthInfo } from "@/hooks/use-auth-info";
import { useChatSocket } from "@/hooks/use-chat";
import {
  SingleChatMessageProps,
  SingleChatRoomComponentProps,
  SingleChatroomProps,
} from "@/lib/types/chat";
import { ArrowDownToDot } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { toast } from "sonner";
import ChatBubble from "./chat-bubble";
import ChatInput from "./chat-input";
import TypingWatchBar from "./typing-watch-bar";

export default function Chatroom({
  attendee,
  chatRoomId: initialChatRoomId,
  event,
  chatRoomType,
}: SingleChatRoomComponentProps) {
  const [chatRoomId] = useState<string | null>(initialChatRoomId || null);
  const [typingUsers, setTypingUsers] = useState<
    Map<
      string,
      { name: string; timestamp: number; displayPicture?: string | null }
    >
  >(new Map());
  const [messages, setMessages] = useState<SingleChatMessageProps[]>([]);
  const [lastFetchTime, setLastFetchTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [loadingChatroom] = useState(!initialChatRoomId);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [pendingMessages, setPendingMessages] = useState<
    SingleChatMessageProps[]
  >([]);
  const [open, setOpen] = useState(true);

  const allMessages = useMemo(() => {
    return [...messages, ...pendingMessages].sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }, [messages, pendingMessages]);

  console.log("MESSAGES", { messages });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const session = useAuthInfo();

  // console.log({ session });
  const router = useRouter();

  // console.log({ attendee });

  const scrollToBottom = useCallback((smooth = true) => {
    const scrollEl = scrollContainerRef.current;
    if (!scrollEl) return;
    requestAnimationFrame(() => {
      scrollEl.scrollTo({
        top: scrollEl.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    });
  }, []);

  // const handleScrollTo

  const handleMessage = useCallback((messagePayload: any) => {
    const message: SingleChatMessageProps = {
      id: messagePayload.id,
      tempId: messagePayload.tempId,
      chatType: messagePayload.chatType,
      attendee_id: messagePayload.attendee_id ?? attendee?.id,
      eventId: messagePayload.eventId,
      creator_id: messagePayload.creator_id ?? session.auth?.user.id,
      sender: {
        id: messagePayload.sender.id,
        name: messagePayload.sender.name,
        displayPicture: messagePayload.sender.displayPicture,
      },
      message: messagePayload.message,
      type: messagePayload.type,
      timestamp: messagePayload.timestamp,
      createdAt: messagePayload.createdAt ?? messagePayload.updatedAt,
      updatedAt: messagePayload.updatedAt,
      isFromCreator: messagePayload.creator_id !== null,
      deletedAt: messagePayload.deletedAt ?? null,
    };

    // console.log({ message });

    // console.log({ messagePayload });

    setMessages((prev) => {
      // Avoid duplicates
      const exists = prev.some((m) => m.id === message.id);
      if (exists) return prev;
      return [...prev, message];
    });

    setPendingMessages((prev) =>
      prev.filter(
        (m) =>
          !(
            (messagePayload.tempId && m.tempId === messagePayload.tempId) ||
            (!messagePayload.tempId &&
              m.message === messagePayload.message &&
              m.sender.id === messagePayload.sender?.id)
          )
      )
    );

    setLastFetchTime(new Date().toISOString());
  }, []);

  // console.log({ messages });
  // console.log({ pendingMessages });

  const handleUserJoined = useCallback(
    (data: any) => {
      // toast.info(`${data.userName} has joined the chat!`);
      toast.custom(
        (t) => (
          <div className=" bg-[#333333] rounded-[8px] p-3 flex items-center gap-3">
            <span className=" flex items-center gap-3 text-white">
              <AiFillInfoCircle className=" text-white" />
              <p className=" text-[12px]">
                {data.userName} has joined the chat!
              </p>
            </span>
          </div>
        ),
        {
          position: "top-center",
          duration: 4000,
        }
      );
    },
    [scrollToBottom]
  );

  const handleUserLeft = useCallback((data: any) => {
    console.log("User left:", data);
  }, []);

  const handleTyping = useCallback(
    (data: any) => {
      const { userId, userName, displayPicture, isTyping } = data;
      // console.log({ data });
      console.log("Typing event received:", {
        userId,
        userName,
        displayPicture,
        isTyping,
        currentUserId: session.auth?.user.id,
      });

      if (userId === session.auth?.user.id) {
        console.log("Ignoring typing event from current user");
        return;
      }

      setTypingUsers((prev) => {
        const newMap = new Map(prev);
        if (isTyping) {
          newMap.set(userId, {
            name: userName,
            displayPicture: attendee?.displayPicture,
            timestamp: Date.now(),
          });
          console.log(`${userName} started typing`);
        } else {
          newMap.delete(userId);
          console.log(`${userName} stopped typing`);
        }
        console.log(
          "Current typing users:",
          Array.from(newMap.values()).map((u) => u.name)
        );
        return newMap;
      });

      // Auto-clear typing indicator after 5 seconds
      if (isTyping) {
        setTimeout(() => {
          setTypingUsers((prev) => {
            const newMap = new Map(prev);
            const existing = newMap.get(userId);
            if (existing && Date.now() - existing.timestamp > 4500) {
              newMap.delete(userId);
              console.log(`Auto-cleared typing for ${userName}`);
            }
            return newMap;
          });
        }, 9000);
      }
    },
    [session.auth?.user.id] // Only depend on current user's attendee ID
  );

  const handleMessageSeen = useCallback((data: any) => {
    console.log("Message seen:", data);
  }, []);

  const handleRecentMessages = useCallback(
    (data: any) => {
      console.log("Recent messages received:", data.messages);

      if (data.messages) {
        const formattedMessages = data.messages.map((msg: any) => ({
          id: msg.id,
          chatType: msg.payload?.chatType,
          updatedAt: msg.updatedAt,
          deletedAt: msg.deletedAt,
          creator_id: msg.creator_id,
          eventId: msg.payload?.eventId,
          sender: msg.payload?.sender || {
            id: msg.payload.sender.id,
            name: msg.attendee?.user?.name || "Unknown User",
            displayPicture: msg.attendee?.user?.image,
          },
          message: msg.message,
          // status: msg.payload.status,
          type: msg.payload?.type || "text",
          timestamp: msg.payload?.timestamp,
          isFromCreator: msg.isFromCreator,
          // meta: msg.payload?.meta,
          createdAt: msg.createdAt,
          attendee_id: msg.attendee_id,
        }));

        console.log({ formattedMessages });
        setMessages(formattedMessages);
        setLastFetchTime(new Date().toISOString());
        setTimeout(() => scrollToBottom(false), 100);
      }
      setLoading(false);
    },
    [scrollToBottom]
  );

  const handleError = useCallback((err: any) => {
    console.error("Socket error:", err);
    setError(err.message || "Connection error");
  }, []);

  // Socket connection
  const {
    socket,
    isConnected,
    joinRoom,
    leaveRoom,
    sendMessage: socketSendMessage,
    sendTyping,
    markMessageSeen,
    getRecentMessages,
  } = useChatSocket({
    token: session.auth?.accessToken || "",
    onMessage: handleMessage,
    onUserJoined: handleUserJoined,
    onUserLeft: handleUserLeft,
    onTyping: handleTyping,
    onMessageSeen: handleMessageSeen,
    onRecentMessages: handleRecentMessages,
    onError: handleError,
  });

  const stableChatRoomId = useRef(chatRoomId);
  const stableUserId = useRef(session.auth?.user.id);

  useEffect(() => {
    if (stableChatRoomId.current && stableUserId.current && isConnected) {
      console.log(
        "Joining room:",
        stableChatRoomId.current,
        "with user:",
        stableUserId.current
      );
      joinRoom(stableChatRoomId.current, stableUserId.current);
      getRecentMessages(stableChatRoomId.current, 90);
    }

    return () => {
      if (stableChatRoomId.current && stableUserId.current && isConnected) {
        leaveRoom(stableChatRoomId.current, stableUserId.current);
      }
    };
  }, [isConnected, joinRoom, leaveRoom, getRecentMessages]);

  useEffect(() => {
    stableChatRoomId.current = chatRoomId;
    stableUserId.current = session.auth?.user.id;
  }, [chatRoomId, session.auth?.user.id]);

  const refreshMessages = useCallback(() => {
    if (chatRoomId && isConnected) {
      getRecentMessages(chatRoomId, 50);
    }
  }, [chatRoomId, isConnected, getRecentMessages]);

  const checkScrollPosition = useCallback(() => {
    const scrollEl = scrollContainerRef.current;
    if (!scrollEl) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollEl;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
    const nearBottom = distanceFromBottom < 80;

    setIsNearBottom(nearBottom);
    if (nearBottom) {
      setNewMessageCount(0);
      setShowScrollButton(false);
    } else if (messages.length > 0) {
      setShowScrollButton(true);
    }
  }, [messages.length]);

  useEffect(() => {
    const scrollEl = scrollContainerRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      requestAnimationFrame(checkScrollPosition);
    };

    scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    checkScrollPosition();

    return () => {
      scrollEl.removeEventListener("scroll", handleScroll);
    };
  }, [checkScrollPosition]);

  useEffect(() => {
    if (allMessages.length === 0) return;

    if (isNearBottom) {
      scrollToBottom(true);
    } else {
      setNewMessageCount((prev) => prev + 1);
    }
  }, [allMessages.length, isNearBottom, scrollToBottom]);

  useEffect(() => {
    if (!loading && allMessages.length > 0) {
      const timeoutId = setTimeout(() => scrollToBottom(false), 100);
      return () => clearTimeout(timeoutId);
    }
  }, [loading, allMessages.length, scrollToBottom]);

  const handleSendMessage = useCallback(
    async (
      messageText: string,
      type: "text" | "audio" | "image" | "link" = "text"
    ) => {
      if (
        !chatRoomId ||
        !messageText.trim() ||
        !session?.auth?.user ||
        !isConnected
      )
        return;

      // Safely get user and attendee info
      const userId = session.auth.user.id ?? "";
      const attendeeId = attendee?.id || null;

      // Fallbacks to make sure we always have something valid
      if (!userId && !attendeeId) {
        console.warn("Cannot send message without user or attendee ID");
        return;
      }

      const tempId = `temp-${Date.now()}`;
      const tempTimestamp = new Date().toISOString();

      const optimisticMessage: SingleChatMessageProps = {
        id: tempId,
        // tempId,
        sender: {
          id: userId,
          name: attendee?.name || "You",
          displayPicture:
            attendee?.displayPicture || session.auth.user.displayPicture,
        },
        message: messageText,
        type,
        timestamp: tempTimestamp,
        attendee_id: attendee?.id,
        // status: "sending",
        chatType: chatRoomType,
        updatedAt: tempTimestamp,
        eventId: event.id,
        createdAt: tempTimestamp,
        creator_id: userId,
        deletedAt: null,
        isFromCreator: attendee === null,
      };

      console.log({ optimisticMessage });

      // Add optimistic message immediately
      setPendingMessages((prev) => [...prev, optimisticMessage]);

      try {
        const userIdPayload = attendeeId ? attendeeId : userId;
        console.log({ userIdPayload });
        socketSendMessage({
          tempId,
          chatRoomId,
          message: messageText,
          creator_id: userId,
          type,
          chatType: chatRoomType,
          eventId: event.id,
          id: userId!,
          updatedAt: tempTimestamp,
          attendee_id: attendeeId ?? userId,
          deletedAt: null,
          isFromCreator: attendee === null,
          timestamp: tempTimestamp,
          createdAt: tempTimestamp,
        });
      } catch (err) {
        console.error("Failed to send message:", err);
        setPendingMessages((prev) =>
          prev.map((m) =>
            m.tempId === tempId ? { ...m, status: "failed" } : m
          )
        );
      }
    },
    [
      chatRoomId,
      session?.auth?.user,
      isConnected,
      chatRoomType,
      event.id,
      attendee,
      socketSendMessage,
    ]
  );

  const handleRetryMessage = useCallback(
    async (message: SingleChatMessageProps) => {
      if (!message?.message) return;

      setPendingMessages((prev) =>
        prev.map((m) =>
          m.tempId === message.tempId ? { ...m, status: "sending" } : m
        )
      );

      try {
        await handleSendMessage(message.message, message.type as any);
        setPendingMessages((prev) =>
          prev.filter((m) => m.tempId !== message.tempId)
        );
      } catch {
        setPendingMessages((prev) =>
          prev.map((m) => (m.tempId === message.tempId ? { ...m } : m))
        );
      }
    },
    [handleSendMessage]
  );

  const handleTypingIndicator = useCallback(
    (isTyping: boolean) => {
      if (chatRoomId && session.auth?.user.id && isConnected) {
        console.log(
          `Broadcasting typing ${
            isTyping ? "start" : "stop"
          } to other users in room ${chatRoomId}`
        );
        sendTyping(chatRoomId, session.auth?.user.id ?? "", isTyping);
      }
    },
    [chatRoomId, session.auth?.user.id, isConnected, sendTyping]
  );

  console.log({ typingUsers });

  const isCurrentUser = useCallback(
    (message: SingleChatMessageProps) =>
      message.sender.id === session.auth?.user.id,
    [session.auth?.user.id]
  );

  const handleEditing = async (id: string, newText: string) => {
    // console.log({ id, newText });
    try {
      const res = await fetch("/api/chat/edit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newText, id: id }),
      });
      const data = await res.json();
      // console.log({ data: data.data.data });
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id
            ? { ...msg, message: newText, updatedAt: data.data.data.updatedAt }
            : msg
        )
      );
    } catch (e: any) {
      console.error("Failed to update message:", e);
    }
  };

  const handleDeleting = async (id: string) => {
    try {
      const res = await fetch("/api/chat/delete", {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body: JSON.stringify({ id }),
      });
      const data = await res.json();

      // console.log({ data });

      // setMessages((prev) => prev.filter((msg) => msg.id !== id));

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id
            ? {
                ...msg,
                deletedAt: new Date().toISOString(),
              }
            : msg
        )
      );
    } catch (e: any) {
      console.log("Unable to delete messages", e);
    }
  };

  const handlePrivateChat = async (
    userType: "host" | "attendee",
    participantA: string
  ) => {
    const payloadAttendee = {
      eventId: event.id,
      participantA: participantA,
      participantB: attendee?.id,
    };

    const payloadHost = {
      eventId: event.id,
      participantA: participantA,
    };

    console.log({ payloadHost });

    console.log({
      participantA,
      participantB: attendee?.id,
    });

    try {
      const res = await fetch(
        userType === "attendee"
          ? "/api/chat/chatroom-with-attendee"
          : "/api/chat/chatroom-with-host",
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(
            userType === "host" ? payloadHost : payloadAttendee
          ),
        }
      );
      const data = await res.json();
      const chatroom: SingleChatroomProps = data.data;
      if (chatroom) {
        router.push(`/user/me/my-chats/${chatroom.id}`);
      }
    } catch (e: any) {
      console.log("Unable to access private room", e);
    }
  };

  if (loadingChatroom) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading chatroom...</p>
        </div>
      </div>
    );
  }

  if (!chatRoomId) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Failed to load chatroom</p>
          <Button onClick={() => router.back()} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isConnected ? (
        <ChatroomSkeleton />
      ) : (
        <div className=" relative h-[calc(100svh-55px)] py-[5px] px-[10px]">
          <ScrollArea
            style={{ scrollBehavior: "smooth" }}
            ref={scrollContainerRef}
            className=" h-full"
          >
            <div className=" ">
              {allMessages.length === 0 ? (
                <div className=" absolute top-1/2 -translate-x-[50%] -translate-y-[50%] text-center  left-1/2">
                  <p className=" text-accent text-[12px]">
                    Be the first to send a message here
                  </p>
                </div>
              ) : (
                <div className="flex pb-[120px]  gap-5 flex-col">
                  {allMessages.map((message) => (
                    <ChatBubble
                      onEditMessage={handleEditing}
                      onDeleteMessage={handleDeleting}
                      isCurrentUser={isCurrentUser(message)}
                      message={message}
                      isPrivate={chatRoomType === "private"}
                      key={message.id || message.tempId}
                      onPrivateChat={handlePrivateChat}
                      // onPrivateChat={(userId) => {
                      //   router.push(`/chat/${userId}`);
                      // }}
                      onRetry={handleRetryMessage}
                      attendee={attendee}
                    />
                  ))}
                </div>
              )}
              {showScrollButton && (
                <Button
                  onClick={() => {
                    scrollToBottom();
                  }}
                  className=" fixed right-0 flex items-center rounded-full bottom-0 mb-[100px] mr-[10px] z-40"
                >
                  <ArrowDownToDot className=" w-3 h-3" />
                  {newMessageCount && (
                    <p className=" text-[12px]">
                      {newMessageCount} new{" "}
                      {newMessageCount > 1 ? "messages" : "message"}
                    </p>
                  )}
                </Button>
              )}
              <TypingWatchBar typingUsers={typingUsers} />
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
          <ChatInput
            onSendMessage={handleSendMessage}
            onTyping={handleTypingIndicator}
            disabled={!isConnected}
            placeholder={isConnected ? "Write message..." : "Connecting..."}
          />
        </div>
      )}
      {/* 
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className=" bg-secondary border-0 z-50">
          <DialogTitle hidden>dfmd</DialogTitle>
          <p className=" text-center">Creating Connection</p>
          <div className=" flex flex-row items-center justify-center  ">
            <div className=" animate-pulse w-[120px]  relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide animate-spin lucide-loader-circle-icon lucide-loader-circle"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              <Image
                alt="image"
                src={"/no-profile.jpg"}
                width={"1000"}
                height={"1000"}
                className=" w-[80px] top-1/2 -translate-x-1/2 left-1/2  -translate-y-1/2 absolute h-[80px] rounded-full object-cover"
              />
            </div>
            <div className=" animate-pulse w-[120px]  relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide animate-spin lucide-loader-circle-icon lucide-loader-circle"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              <Image
                alt="image"
                src={"/no-profile.jpg"}
                width={"1000"}
                height={"1000"}
                className=" w-[80px] top-1/2 -translate-x-1/2 left-1/2  -translate-y-1/2 absolute h-[80px] rounded-full object-cover"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog> */}
    </>
  );
}
