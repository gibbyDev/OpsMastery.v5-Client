"use client"

import { useState, useRef, useEffect } from "react"
import { Minimize2, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { VideoChatControls } from "./VideoChatControls"
import { VideoChatAvatar } from "./VideoChatAvatar"
import { VideoPane } from "./VideoPane"

type ActiveStatus = "active" | "meeting" | "away"

interface User {
  id: string
  name: string
  avatar: string
  isVideoOn: boolean
  isAudioOn: boolean
  activeStatus: ActiveStatus
  stream?: MediaStream
}

export default function VideoChat() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "You",
      avatar: "/diverse-user-avatars.png",
      isVideoOn: true,
      isAudioOn: true,
      activeStatus: "active",
    },
    {
      id: "2",
      name: "Alice Johnson",
      avatar: "/diverse-woman-avatar.png",
      isVideoOn: true,
      isAudioOn: true,
      activeStatus: "meeting",
    },
    { id: "3", name: "Bob Smith", avatar: "/man-avatar.png", isVideoOn: false, isAudioOn: true, activeStatus: "away" },
    {
      id: "4",
      name: "Carol Davis",
      avatar: "/woman-avatar-2.png",
      isVideoOn: true,
      isAudioOn: false,
      activeStatus: "active",
    },
    {
      id: "5",
      name: "David Wilson",
      avatar: "/man-avatar-2.png",
      isVideoOn: true,
      isAudioOn: true,
      activeStatus: "meeting",
    },
  ])

  const [isMainVideoOn, setIsMainVideoOn] = useState(true)
  const [isMainAudioOn, setIsMainAudioOn] = useState(true)
  const [fullscreenUser, setFullscreenUser] = useState<string | null>(null)
  const [additionalUsers] = useState(2)
  const [isCallActive, setIsCallActive] = useState(true)

  const mainVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (mainVideoRef.current && isMainVideoOn) {
      mainVideoRef.current.src = "/video-call-simulation.png"
    }
  }, [isMainVideoOn])

  const toggleUserVideo = (userId: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, isVideoOn: !user.isVideoOn } : user)))
  }

  const toggleUserAudio = (userId: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, isAudioOn: !user.isAudioOn } : user)))
  }

  const toggleFullscreen = (userId: string) => {
    setFullscreenUser(fullscreenUser === userId ? null : userId)
  }

  const hangUp = () => {
    setIsCallActive(false)
    setIsMainAudioOn(false)
    setIsMainVideoOn(false)
    console.log("Call ended")
  }

  const startCall = () => {
    setIsCallActive(true)
    console.log("Starting call...")
  }

  const visibleUsers = users.slice(0, 6)
  const hasMoreUsers = users.length > 6 || additionalUsers > 0

  const getGridLayout = () => {
    const totalUsers = users.length
    if (totalUsers <= 2) return { cols: "grid-cols-1", rows: "grid-rows-2" }
    if (totalUsers <= 4) return { cols: "grid-cols-2", rows: "grid-rows-2" }
    if (totalUsers <= 6) return { cols: "grid-cols-3", rows: "grid-rows-2" }
    return { cols: "grid-cols-3", rows: "grid-rows-2" }
  }

  const otherUsers = users.slice(1)
  const shouldShowCornerPane = otherUsers.length === 1

  const paneBg = "bg-muted"
  const pageBg = "bg-background"
  const overlayText = "text-foreground"

  if (!isCallActive) {
    return (
      <div className={`h-screen ${pageBg} relative overflow-hidden`}>
        <div className="absolute inset-0">
          {isMainVideoOn ? (
            <video
              ref={mainVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              src="/main-video-call.png"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${paneBg}`}>
              <div className="flex flex-col items-center">
                <VideoChatAvatar user={users[0]} size={96} />
                <p className={`${overlayText} text-lg`}>{users[0]?.name}</p>
              </div>
            </div>
          )}
        </div>
        <VideoChatControls
          isMainAudioOn={isMainAudioOn}
          isMainVideoOn={isMainVideoOn}
          onToggleAudio={() => setIsMainAudioOn(!isMainAudioOn)}
          onToggleVideo={() => setIsMainVideoOn(!isMainVideoOn)}
          onHangUp={hangUp}
          onStartCall={startCall}
          isCallActive={isCallActive}
        />
      </div>
    )
  }

  if (fullscreenUser) {
    const user = users.find((u) => u.id === fullscreenUser)
    return (
      <div className={`h-screen ${pageBg} relative`}>
        <div className="w-full h-full flex items-center justify-center">
          {user?.isVideoOn ? (
            <video className="w-full h-full object-cover" autoPlay muted src="/fullscreen-video-call.png" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <VideoChatAvatar user={user!} size={128} />
              <p className={`${overlayText} text-xl`}>{user?.name}</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setFullscreenUser(null)}
          className="absolute top-4 right-4 bg-popover hover:bg-accent rounded p-2"
        >
          <Minimize2 className="w-4 h-4" />
        </button>
        <VideoChatControls
          isMainAudioOn={isMainAudioOn}
          isMainVideoOn={isMainVideoOn}
          onToggleAudio={() => setIsMainAudioOn(!isMainAudioOn)}
          onToggleVideo={() => setIsMainVideoOn(!isMainVideoOn)}
          onHangUp={hangUp}
          isCallActive={isCallActive}
        />
      </div>
    )
  }

  return (
    <div className={`h-screen ${pageBg} relative overflow-hidden`}>
      {shouldShowCornerPane ? (
        <>
          <div className="absolute inset-0">
            {isMainVideoOn ? (
              <video
                ref={mainVideoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                src="/main-video-call.png"
              />
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${paneBg}`}>
                <div className="flex flex-col items-center">
                  <VideoChatAvatar user={users[0]} size={96} />
                  <p className={`${overlayText} text-lg`}>{users[0]?.name}</p>
                </div>
              </div>
            )}
          </div>
          <div className="absolute top-4 right-4 w-80 h-60">
            <VideoPane
              user={otherUsers[0]}
              onToggleVideo={() => toggleUserVideo(otherUsers[0].id)}
              onToggleAudio={() => toggleUserAudio(otherUsers[0].id)}
              onToggleFullscreen={() => toggleFullscreen(otherUsers[0].id)}
            />
          </div>
        </>
      ) : (
        <div className="w-full h-full p-4">
          <div className={cn("grid gap-4 h-full", getGridLayout().cols, getGridLayout().rows)}>
            {users.slice(0, 6).map((user) => (
              <VideoPane
                key={user.id}
                user={user}
                onToggleVideo={() => toggleUserVideo(user.id)}
                onToggleAudio={() => toggleUserAudio(user.id)}
                onToggleFullscreen={() => toggleFullscreen(user.id)}
                isMainUser={user.id === "1"}
              />
            ))}
            {users.length > 6 && (
              <div className={`${paneBg} rounded-lg flex items-center justify-center relative group`}>
                <div className="text-center">
                  <Users className={`w-6 h-6 ${overlayText} mx-auto mb-1`} />
                  <p className={`${overlayText} text-sm`}>+{users.length - 6 + additionalUsers} more</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <VideoChatControls
        isMainAudioOn={isMainAudioOn}
        isMainVideoOn={isMainVideoOn}
        onToggleAudio={() => setIsMainAudioOn(!isMainAudioOn)}
        onToggleVideo={() => setIsMainVideoOn(!isMainVideoOn)}
        onHangUp={hangUp}
        isCallActive={isCallActive}
      />
    </div>
  )
}
