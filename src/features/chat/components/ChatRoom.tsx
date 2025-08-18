"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/store/authSlice";
import { ChatSidebar } from "./ChatSidebar";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export default function ChatRoom() {
  const currentUser = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);

  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Fetch chat history when a partner is selected
  useEffect(() => {
    if (!selectedPartner || !currentUser) return;
    fetch(
      `/api/v1/chats?user1=${currentUser.id}&user2=${selectedPartner.id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then(setMessages)
      .catch(() => setMessages([]));
  }, [selectedPartner, currentUser, accessToken]);

  // Send message (persist to backend)
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedPartner || !currentUser) return;
    const msg = {
      sender_username: currentUser.username,
      recipient: selectedPartner.username,
      content: newMessage,
    };
    // POST to backend (implement this route if needed)
    await fetch(`${API_URL}/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({
        user1: currentUser.id,
        user2: selectedPartner
      }),
    });
    setNewMessage("");
    // Optionally re-fetch messages
    fetch(
      `/api/v1/chats?user1=${currentUser.id}&user2=${selectedPartner.id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then(setMessages)
      .catch(() => setMessages([]));
  };

  // Delete chat
  const handleDeletePartner = async (partner: any) => {
    if (!currentUser) return;
    await fetch(
      `/api/v1/chats?user1=${currentUser.id}&user2=${partner.id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: "include",
      }
    );
    setSelectedPartner(null);
    setMessages([]);
    // No .json() call here!
  };

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
