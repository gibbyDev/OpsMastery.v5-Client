"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";

interface Message {
  id?: string;
  sender_username: string;
  recipient: string;
  content: string;
  timestamp?: string;
}

interface ChatMessagesProps {
  messages: Message[];
  currentUser: { username: string };
  formatTime: (iso?: string) => string;
}

export function ChatMessages({ messages, currentUser, formatTime }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={cn("flex", message.sender_username === currentUser.username ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                message.sender_username === currentUser.username ? "bg-primary text-primary-foreground" : "bg-muted",
              )}
            >
              <p className="text-sm">{message.content}</p>
              <p
                className={cn(
                  "text-xs mt-1",
                  message.sender_username === currentUser.username ? "text-primary-foreground/70" : "text-muted-foreground",
                )}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}