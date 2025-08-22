import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type ActiveStatus = "active" | "meeting" | "away"

interface VideoChatAvatarProps {
  user: {
    name: string
    avatar: string
    activeStatus: ActiveStatus
  }
  size?: number // px
}

function getStatusColor(status: ActiveStatus) {
  switch (status) {
    case "active":
      return "ring-green-500"
    case "meeting":
      return "ring-red-500"
    case "away":
      return "ring-orange-500"
    default:
      return "ring-muted"
  }
}

export function VideoChatAvatar({ user, size = 96 }: VideoChatAvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full ring-4 flex items-center justify-center",
        getStatusColor(user.activeStatus),
        `w-[${size}px] h-[${size}px] mb-4`
      )}
      style={{ width: size, height: size }}
    >
      <Avatar className={`w-[${size - 16}px] h-[${size - 16}px]`}>
        <AvatarImage src={user.avatar || "/placeholder.svg"} />
        <AvatarFallback className="bg-muted text-foreground">{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
    </div>
  )
}