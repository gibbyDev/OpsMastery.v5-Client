// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuLabel,
// } from "@/components/ui/dropdown-menu";
// import { Menu, X, MoreVertical, Phone, Video } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface User {
//   id: string;
//   username: string;
//   email?: string;
//   avatar?: string;
// }

// interface ChatHeaderProps {
//   selectedChatUser: User;
//   isSidebarCollapsed: boolean;
//   setIsSidebarCollapsed: (v: boolean) => void;
// }

// export function ChatHeader({
//   selectedChatUser,
//   isSidebarCollapsed,
//   setIsSidebarCollapsed,
// }: ChatHeaderProps) {
//   const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

//   if (!selectedChatUser) {
//     return (
//       <div className="p-4 border-b border-border flex items-center justify-between">
//         <span className="text-muted-foreground">No user selected</span>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 border-b border-border flex items-center justify-between">
//       {/* Collapse button on far left */}
//       <Button
//         size="sm"
//         variant="ghost"
//         onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
//         className="mr-2"
//       >
//         {isSidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
//       </Button>

//       {/* User info centered */}
//       <div className="flex-1 flex flex-col items-center">
//         <h2 className="font-semibold">{selectedChatUser.username || selectedChatUser.email}</h2>
//         <p className="text-sm text-muted-foreground">{selectedChatUser.email}</p>
//       </div>

//       {/* Controls and avatar on far right */}
//       <div className="flex items-center gap-2">
//         <Button size="icon" variant="ghost" title="Start phone call">
//           <Phone className="h-5 w-5" />
//         </Button>
//         <Button size="icon" variant="ghost" title="Start video call">
//           <Video className="h-5 w-5" />
//         </Button>
//         <DropdownMenu open={avatarMenuOpen} onOpenChange={setAvatarMenuOpen}>
//           <DropdownMenuTrigger asChild>
//             <Avatar className="h-8 w-8 cursor-pointer">
//               <AvatarImage src={selectedChatUser.avatar || "/placeholder.svg"} />
//               <AvatarFallback>
//                 {selectedChatUser.username
//                   ? selectedChatUser.username.charAt(0)
//                   : selectedChatUser.email
//                   ? selectedChatUser.email.charAt(0)
//                   : "?"}
//               </AvatarFallback>
//             </Avatar>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="min-w-[180px]">
//             <DropdownMenuLabel>User Settings</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Profile</DropdownMenuItem>
//             <DropdownMenuItem>Notifications</DropdownMenuItem>
//             <DropdownMenuItem>Sign Out</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </div>
//   );
// }

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

interface User {
  id: string
  username: string
  email?: string
  avatar?: string
}

interface ChatHeaderProps {
  selectedChatUser: User | null
  isSidebarCollapsed: boolean
  setIsSidebarCollapsed: (v: boolean) => void
}

export function ChatHeader({ selectedChatUser, isSidebarCollapsed, setIsSidebarCollapsed }: ChatHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="p-4 border-b border-border flex items-center justify-between bg-background">
      {/* Sidebar toggle */}
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className="h-8 w-8 p-0"
      >
        {isSidebarCollapsed ? "☰" : "✕"}
      </Button>

      {/* User info */}
      <div className="flex-1 flex items-center justify-center">
        {selectedChatUser ? (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={selectedChatUser.avatar || "/placeholder.svg?height=32&width=32"} />
              <AvatarFallback>
                {selectedChatUser.username ? selectedChatUser.username.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="font-semibold text-sm">{selectedChatUser.username}</h2>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">Select a conversation</span>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1">
        {selectedChatUser && (
          <>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Voice call">
              📞
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Video call">
              📹
            </Button>
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  ⋮
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Chat Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                <DropdownMenuItem>Clear History</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Block User</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  )
}
