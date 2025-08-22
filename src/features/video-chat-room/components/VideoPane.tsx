import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Video, VideoOff, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

type ActiveStatus = "active" | "meeting" | "away"

interface User {
  id: string
  name: string
  avatar: string
  isVideoOn: boolean
  isAudioOn: boolean
  activeStatus: ActiveStatus
}

interface VideoPaneProps {
  user: User
  onToggleVideo: () => void
  onToggleAudio: () => void
  onToggleFullscreen: () => void
  isMainUser?: boolean
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

export function VideoPane({ user, onToggleVideo, onToggleAudio, onToggleFullscreen, isMainUser }: VideoPaneProps) {
  const paneBg = "bg-muted"
  const overlayBg = "bg-popover"
  const overlayText = "text-foreground"

  return (
    <div className={`${paneBg} rounded-lg overflow-hidden relative group`}>
      <div className="w-full h-full flex items-center justify-center">
        {user.isVideoOn ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            src={
              isMainUser
                ? "/main-video-call.png"
                : `/placeholder.svg?height=200&width=300&query=${user.name} video call`
            }
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div
              className={cn(
                "rounded-full ring-4 flex items-center justify-center",
                getStatusColor(user.activeStatus),
                "w-12 h-12"
              )}
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className={`${paneBg} ${overlayText}`}>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <p className={`${overlayText} text-xs text-center px-2`}>{user.name}</p>
          </div>
        )}
      </div>
      {!user.isAudioOn && (
        <div className="absolute top-2 left-2">
          <div className="bg-destructive rounded-full p-1">
            <MicOff className="w-3 h-3 text-foreground" />
          </div>
        </div>
      )}
      <div className="absolute bottom-2 left-2">
        <div className={`${overlayBg} backdrop-blur-sm rounded-full px-2 py-1`}>
          <p className={`${overlayText} text-xs font-medium`}>{user.name}</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-popover/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <Button
          onClick={onToggleAudio}
          variant={user.isAudioOn ? "secondary" : "destructive"}
          size="sm"
          className="w-8 h-8 rounded-full p-0"
        >
          {user.isAudioOn ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
        </Button>
        <Button
          onClick={onToggleVideo}
          variant={user.isVideoOn ? "secondary" : "destructive"}
          size="sm"
          className="w-8 h-8 rounded-full p-0"
        >
          {user.isVideoOn ? <Video className="w-3 h-3" /> : <VideoOff className="w-3 h-3" />}
        </Button>
        <Button onClick={onToggleFullscreen} variant="secondary" size="sm" className="w-8 h-8 rounded-full p-0">
          <Maximize2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}