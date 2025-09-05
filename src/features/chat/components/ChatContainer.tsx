"use client"

import { useState } from "react"
import ChatMessages from "./ChatMessages"
import ChatInput from "./ChatInput"
import { ChatHeader } from "./ChatHeader"
import ChatSidebar from "./ChatSidebar"
import { dummyPartners, dummyMessages, ChatUser } from "@/constants/data"

type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

export default function ChatContainer() {
  const [partners, setPartners] = useState<ChatUser[]>(dummyPartners)
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(partners[0] || null)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>(() => {
    // Initialize with dummyMessages, fallback to empty array for new users
    const map: Record<string, Message[]> = {}
    partners.forEach((p) => {
      map[p.id] = dummyMessages[p.id] ? dummyMessages[p.id].map(m => ({ ...m, timestamp: new Date(m.timestamp) })) : []
    })
    return map
  })

  const currentMessages = selectedUser ? messagesMap[selectedUser.id] || [] : []

  const handleSendMessage = (content: string) => {
    if (!content.trim() || !selectedUser) return
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }
    setMessagesMap((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
    }))
  }

  const handleSelectUser = (user: ChatUser | null) => {
    setSelectedUser(user)
  }

  return (
    <div className="flex h-full bg-background">
      {/* Sidebar */}
      {!isSidebarCollapsed && (
        <ChatSidebar
          partners={partners}
          setPartners={setPartners}
          selectedPartnerId={selectedUser?.id || null}
          onSelectPartner={handleSelectUser}
        />
      )}
      {/* Main chat area */}
      <div className="flex flex-col flex-1 min-h-0">
        <ChatHeader
          selectedChatUser={selectedUser}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />
        <div className="flex flex-col flex-1 min-h-0">
          {selectedUser ? (
            <>
              <div className="flex-1 min-h-0">
                <ChatMessages messages={currentMessages} selectedChatUser={{ name: selectedUser.username }} />
              </div>
              <div className="flex-shrink-0 px-4 pb-4">
                <ChatInput onSend={handleSendMessage} />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
