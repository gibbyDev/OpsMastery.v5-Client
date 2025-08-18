"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, MoreVertical } from "lucide-react";

interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
}

interface ChatHeaderProps {
  selectedChatUser: User;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (v: boolean) => void;
}

export function ChatHeader({ selectedChatUser, isSidebarCollapsed, setIsSidebarCollapsed }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b border-border flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="mr-2"
        >
          {isSidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarImage src={selectedChatUser.avatar || "/placeholder.svg"} />
          <AvatarFallback>
            {selectedChatUser.username
              ? selectedChatUser.username.charAt(0)
              : selectedChatUser.email
              ? selectedChatUser.email.charAt(0)
              : "?"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{selectedChatUser.username || selectedChatUser.email}</h2>
          <p className="text-sm text-muted-foreground">{selectedChatUser.email}</p>
        </div>
      </div>
      <Button size="sm" variant="ghost">
        <MoreVertical className="h-4 w-4" />
      </Button>
    </div>
  );
}