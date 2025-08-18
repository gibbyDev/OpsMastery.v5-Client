"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2, Menu, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { fetchChatPartners, searchUsers, deleteChat } from "@/lib/api/chat";
import { useAuthStore } from "@/lib/store/authSlice";

interface ChatPartner {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  lastMessageTime?: string;
}

interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
}

interface ChatSidebarProps {
  currentUserId: string;
  onSelectPartner: (partner: ChatPartner | User) => void;
  selectedPartnerId: string | null;
  onDeletePartner: (partner: ChatPartner) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (v: boolean) => void;
}

export function ChatSidebar({
  currentUserId,
  onSelectPartner,
  selectedPartnerId,
  onDeletePartner,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
}: ChatSidebarProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [partners, setPartners] = useState<ChatPartner[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loadingPartners, setLoadingPartners] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Fetch chat partners
  useEffect(() => {
    if (!currentUserId) return;
    setLoadingPartners(true);
    fetchChatPartners(currentUserId, accessToken ?? "")
      .then(setPartners)
      .finally(() => setLoadingPartners(false));
  }, [currentUserId, accessToken]);

  // User search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    setLoadingSearch(true);
    searchUsers(searchQuery, accessToken ?? "")
      .then(setSearchResults)
      .finally(() => setLoadingSearch(false));
  }, [searchQuery, accessToken]);

  // For delete
  const handleDelete = async (partner: ChatPartner) => {
    await deleteChat(currentUserId, partner.id, accessToken ?? "");
    // Refresh partners list
    fetchChatPartners(currentUserId, accessToken ?? "").then(setPartners);
  };

  return (
    <div
      className={cn(
        "border-r border-border flex flex-col transition-all duration-300 ease-in-out bg-background",
        isSidebarCollapsed ? "w-0 overflow-hidden" : "w-80"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <span className="font-semibold text-lg">Messages</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
          {isSidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Search Field */}
      <div className="p-4 border-b border-border">
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {searchQuery && (
          <div>
            {loadingSearch ? (
              <div className="text-muted-foreground py-2">Searching...</div>
            ) : searchResults.length > 0 ? (
              searchResults.map((user) => (
                <div
                  key={user.id}
                  onClick={() => onSelectPartner(user)}
                  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {user.username
                        ? user.username.charAt(0)
                        : user.email
                        ? user.email.charAt(0)
                        : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {user.username || user.email || "Unknown"}
                    </p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-muted-foreground py-2">No users found</div>
            )}
          </div>
        )}
      </div>

      {/* Chat Partners */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {loadingPartners ? (
            <div className="text-muted-foreground py-4">Loading chats...</div>
          ) : partners.length > 0 ? (
            partners.map((partner) => (
              <div
                key={partner.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors",
                  selectedPartnerId === partner.id && "bg-accent"
                )}
                onClick={() => onSelectPartner(partner)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={partner.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {partner.username
                      ? partner.username.charAt(0)
                      : partner.email
                      ? partner.email.charAt(0)
                      : "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {partner.username || partner.email || "Unknown"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {partner.lastMessageTime
                      ? new Date(partner.lastMessageTime).toLocaleString()
                      : ""}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(partner);
                  }}
                  title="Delete chat"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))
          ) : (
            <div className="text-muted-foreground py-4">No chats yet.</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}