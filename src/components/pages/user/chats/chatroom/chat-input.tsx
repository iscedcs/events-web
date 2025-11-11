"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatInputProps } from "@/lib/types/chat";
import { Camera, Mic, SendHorizontal } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

export default function ChatInput({
  onSendMessage,
  disabled = false,
  placeholder = "Write message...",
  onTyping,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isCurrentlyTyping = useRef(false);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      // Send stop typing when component unmounts
      if (isCurrentlyTyping.current && onTyping) {
        onTyping(false);
        isCurrentlyTyping.current = false;
      }
    };
  }, [onTyping]);

  const startTyping = useCallback(() => {
    if (!onTyping || disabled) return;

    // Only send typing start if not already typing
    if (!isCurrentlyTyping.current) {
      console.log("Broadcasting typing start to other users");
      isCurrentlyTyping.current = true;
      onTyping(true); // This broadcasts to OTHER users
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing indicator after 3 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      if (isCurrentlyTyping.current) {
        console.log("Auto-stopping typing broadcast (timeout)");
        isCurrentlyTyping.current = false;
        onTyping(false); // This stops broadcasting to OTHER users
      }
    }, 3000);
  }, [onTyping, disabled]);

  const stopTyping = useCallback(() => {
    if (!onTyping) return;

    // Clear timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    // Send stop typing if currently typing
    if (isCurrentlyTyping.current) {
      console.log("Stopping typing broadcast to other users");
      isCurrentlyTyping.current = false;
      onTyping(false); // This stops broadcasting to OTHER users
    }
  }, [onTyping]);

  const handleSend = async () => {
    if (!message.trim() || disabled || isSending) return;

    const messageToSend = message.trim();

    // Stop typing indicator immediately when sending
    stopTyping();

    // Clear input immediately for better UX
    setMessage("");
    setIsSending(true);

    try {
      console.log({ messageToSend });
      await onSendMessage(messageToSend);

      // Focus input after successful send
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } catch (error) {
      console.error("Failed to send message:", error);
      // Restore message if sending failed
      setMessage(messageToSend);

      // Focus input even on error
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } finally {
      setIsSending(false);
    }
  };

  const handleInputBlur = () => {
    // Small delay to prevent flickering when clicking send button
    setTimeout(() => {
      if (!isSending) {
        stopTyping();
      }
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setMessage(newValue);

    // Handle typing indicators based on input content
    if (newValue.trim() && !disabled && !isSending) {
      // User is typing - broadcast to OTHER users
      startTyping();
    } else if (!newValue.trim()) {
      // Input is empty - stop broadcasting to OTHER users
      stopTyping();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else if (e.key !== "Enter" && message.trim() && !disabled && !isSending) {
      // User is actively typing (not just pressing Enter) - broadcast to OTHER users
      startTyping();
    }
  };

  // Handle input focus - resume typing broadcast if there's content
  const handleInputFocus = () => {
    if (message.trim() && !disabled && !isSending) {
      startTyping();
    }
  };

  return (
    <div className=" py-[10px] px-[10px] absolute bg-[#313132] w-full bottom-0 left-0">
      <div className=" flex items-center gap-2">
        {/* <div className=" flex items-center gap-4">
          <Camera className=" w-4 h-4" />
          <Mic className=" w-4 h-4" />
        </div> */}

        <Input
          ref={inputRef}
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          disabled={disabled || isSending}
          autoComplete="off"
          autoFocus
          className="bg-[#151515] border-0 rounded-[8px] px-[15px]"
        />
        <Button
          onClick={handleSend}
          disabled={disabled || isSending}
          size="icon"
          title="Send message"
        >
          {isSending ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
          ) : (
            <SendHorizontal className="h-6 w-6" />
          )}
        </Button>
      </div>
      <p className=" text-center text-accent mt-[5px] text-[10px]">
        Take care with the message you send in here, and obey our{" "}
        <Link className=" underline" href={""}>
          Community Guidelines
        </Link>
      </p>
    </div>
  );
}
