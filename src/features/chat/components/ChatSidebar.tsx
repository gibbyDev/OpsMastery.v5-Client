"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { ChatUser } from "@/constants/data"

type ChatSidebarProps = {
  partners: ChatUser[]
  setPartners: (partners: ChatUser[]) => void
  selectedPartnerId: string | null
  onSelectPartner: (partner: ChatUser | null) => void
}

export default function ChatSidebar({
  partners = [],
  setPartners,
  selectedPartnerId,
  onSelectPartner,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCollapsed, setIsCollapsed] = useState(false)

  const filteredPartners = (partners ?? []).filter(
    (partner) =>
      partner.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    const updatedPartners = partners.filter((p) => p.id !== id)
    setPartners(updatedPartners)
    if (selectedPartnerId === id) {
      onSelectPartner(updatedPartners.length > 0 ? updatedPartners[0] : null)
    }
  }

  return (
    <div
      className={cn(
        "border-r border-border flex flex-col h-full transition-all duration-300 ease-in-out bg-background",
        isCollapsed ? "w-0 overflow-hidden" : "w-80"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-semibold">Messages</h2>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-2"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Search Field */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">🔍</span>
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Chat Partners */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-2">
          {filteredPartners.length > 0 ? (
            filteredPartners.map((partner) => (
              <div
                key={partner.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors group",
                  selectedPartnerId === partner.id && "bg-accent",
                )}
                onClick={() => onSelectPartner(partner)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={partner.avatar || "/placeholder.svg?height=40&width=40"} />
                  <AvatarFallback>{partner.username ? partner.username.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{partner.username}</p>
                  <p className="text-xs text-muted-foreground truncate">{partner.email}</p>
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
                    e.stopPropagation()
                    handleDelete(partner.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                  title="Delete conversation"
                >
                  🗑️
                </Button>
              </div>
            ))
          ) : (
            <div className="text-muted-foreground py-8 text-center text-sm">
              {searchQuery ? "No conversations found" : "No conversations yet"}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
