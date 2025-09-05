'use client';

import { useState } from "react";
import ChatContainer from "@/features/chat/components/ChatContainer";

export default function Home() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedChatUser, setSelectedChatUser] = useState({
    id: "1",
    username: "Alice",
    email: "alice@example.com",
    avatar: "",
  });

  return (
    <ChatContainer />
  );
}