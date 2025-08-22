import { Button } from "@/components/ui/button"
import { Mic, MicOff, Video, VideoOff, Phone, PhoneCall } from "lucide-react"

interface VideoChatControlsProps {
  isMainAudioOn: boolean
  isMainVideoOn: boolean
  onToggleAudio: () => void
  onToggleVideo: () => void
  onHangUp: () => void
  onStartCall?: () => void
  isCallActive: boolean
}

export function VideoChatControls({
  isMainAudioOn,
  isMainVideoOn,
  onToggleAudio,
  onToggleVideo,
  onHangUp,
  onStartCall,
  isCallActive,
}: VideoChatControlsProps) {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
      <div className="bg-black/20 backdrop-blur-sm rounded-full p-1">
        <div className="flex items-center gap-3 bg-black/80 backdrop-blur-sm rounded-full px-4 py-2">
          <Button
            onClick={onToggleAudio}
            variant="secondary"
            size="sm"
            className="rounded-full w-10 h-10 bg-gray-700 hover:bg-gray-700"
          >
            {isMainAudioOn ? <Mic className="w-4 h-4 text-white" /> : <MicOff className="w-4 h-4 text-white" />}
          </Button>
          <Button
            onClick={onToggleVideo}
            variant="secondary"
            size="sm"
            className="rounded-full w-10 h-10 bg-gray-700 hover:bg-gray-700"
          >
            {isMainVideoOn ? <Video className="w-4 h-4 text-white" /> : <VideoOff className="w-4 h-4 text-white" />}
          </Button>
          {isCallActive ? (
            <Button
              onClick={onHangUp}
              variant="destructive"
              size="sm"
              className="rounded-full w-10 h-10"
            >
              <Phone className="w-4 h-4 text-white" />
            </Button>
          ) : (
            <Button
              onClick={onStartCall}
              variant="default"
              size="sm"
              className="rounded-full w-10 h-10 bg-green-600 hover:bg-green-700"
            >
              <PhoneCall className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}