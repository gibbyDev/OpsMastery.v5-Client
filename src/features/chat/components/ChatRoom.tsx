"use client";

import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/lib/store/authSlice";
import {
  getChatHistoryById,
  updateChatUsers,
} from "@/lib/api/chat";
import { ChatSidebar } from "./ChatSidebar";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export default function ChatRoom({ chatId }: { chatId: string }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const currentUser = useAuthStore((state) => state.user);

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Add this state to check if we're on the client
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Fetch chat history by chatId
  useEffect(() => {
    if (!chatId || !accessToken) return;
    getChatHistoryById(chatId, accessToken ?? "").then(setMessages);
  }, [chatId, accessToken]);

  // WebSocket for real-time updates
  useEffect(() => {
    if (!chatId || !accessToken) return;
    const ws = new WebSocket(`ws://localhost:5000/ws?chatId=${chatId}&token=${accessToken ?? ""}`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        setMessages((prev) => [...prev, msg]);
      } catch (err) {
        console.error("Failed to parse message:", event.data, err);
      }
    };

    ws.onerror = (event) => {
      console.error("WebSocket error", event);
    };

    ws.onclose = () => {
      wsRef.current = null;
    };

    return () => {
      ws.close();
    };
  }, [chatId, accessToken]);

  // Add/remove users to chat (group membership)
  const handleUpdateChatUsers = async (userIds: string[]) => {
    if (!chatId || !accessToken) return;
    await updateChatUsers(chatId, userIds, accessToken ?? "");
    // Optionally, refetch chat members or update UI
  };

  // Send message (persist to backend)
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !chatId || !currentUser) return;
    const msg = {
      sender_username: currentUser.username,
      content: newMessage,
    };
    // POST to backend (implement this route if needed)
    await fetch(`${API_URL}/chats/${chatId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({
        sender: currentUser.username,
        content: newMessage,
      }),
    });
    setNewMessage("");
    // Optionally re-fetch messages
    getChatHistoryById(chatId, accessToken ?? "").then(setMessages);
  };

  const handleDeletePartner = async (partner: any) => {
    if (!chatId || !accessToken) return;
    await fetch(`${API_URL}/chats/${chatId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken ?? ""}` },
      credentials: "include",
    });
    setSelectedPartner(null);
    setMessages([]);
    // Optionally, refresh sidebar partners list here
  };

  if (!hasMounted) {
    // Prevent rendering until client hydration
    return null;
  }

  if (!currentUser) {
    return <div className="flex items-center justify-center h-screen">Please sign in.</div>;
  }

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar
        currentUserId={currentUser.id}
        onSelectPartner={setSelectedPartner}
        selectedPartnerId={selectedPartner?.id || null}
        onDeletePartner={handleDeletePartner}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col">
        {selectedPartner ? (
          <>
            <ChatHeader
              selectedChatUser={selectedPartner}
              isSidebarCollapsed={false}
              setIsSidebarCollapsed={() => {}}
            />
            <ChatMessages
              messages={messages}
              currentUser={currentUser}
              formatTime={(iso?: string) =>
                iso
                  ? new Date(iso).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : ""
              }
            />
            <ChatInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a chat from the sidebar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
