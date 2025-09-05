// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Plus, ArrowUp, Settings2, Mic, X, Check } from "lucide-react"

// export default function ChatInput({ onSend }: { onSend: (msg: string) => void }) {
//   const [input, setInput] = useState("")
//   const [isRecording, setIsRecording] = useState(false)

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (input.trim()) {
//       onSend(input)
//       setInput("")
//     }
//   }

//   const handleMicClick = () => {
//     setIsRecording(true)
//     setTimeout(() => {
//       setIsRecording(false)
//       setInput("When speech to text feature ?")
//     }, 5000)
//   }

//   const handleCancelRecording = () => {
//     setIsRecording(false)
//   }

//   const handleConfirmRecording = () => {
//     setIsRecording(false)
//     setInput("When speech to text feature ?")
//   }

//   const WaveAnimation = () => {
//     const [animationKey, setAnimationKey] = useState(0)

//     useEffect(() => {
//       const interval = setInterval(() => {
//         setAnimationKey((prev) => prev + 1)
//       }, 100)
//       return () => clearInterval(interval)
//     }, [])

//     const bars = Array.from({ length: 50 }, (_, i) => {
//       const height = Math.random() * 20 + 4
//       const delay = Math.random() * 2
//       return (
//         <div
//           key={`${i}-${animationKey}`}
//           className="bg-muted-foreground rounded-sm animate-pulse"
//           style={{
//             width: "2px",
//             height: `${height}px`,
//             animationDelay: `${delay}s`,
//             animationDuration: "1s",
//           }}
//         />
//       )
//     })

//     return (
//       <div className="flex items-center w-full gap-1">
//         <div className="flex-1 border-t-2 border-dotted border-muted"></div>
//         <div className="flex items-center gap-0.5 justify-center px-8">{bars}</div>
//         <div className="flex-1 border-t-2 border-dotted border-muted"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="relative">
//       <form onSubmit={handleSubmit} className="relative">
//         <div className="border border-border rounded-2xl p-4 relative transition-all duration-500 ease-in-out overflow-hidden bg-background">
//           {isRecording ? (
//             <div className="flex items-center justify-between h-12 animate-in fade-in-0 slide-in-from-top-2 duration-500 w-full">
//               <WaveAnimation />
//               <div className="flex items-center gap-2 ml-4">
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="sm"
//                   onClick={handleCancelRecording}
//                   className="h-8 w-8 p-0 text-foreground hover:bg-muted rounded-lg transition-all duration-200 hover:scale-110"
//                 >
//                   <X className="h-5 w-5" />
//                 </Button>
//                 <Button
//                   type="button"
//                   size="sm"
//                   onClick={handleConfirmRecording}
//                   className="h-8 w-8 p-0 rounded-lg transition-all duration-200 hover:scale-110 bg-primary text-primary-foreground"
//                 >
//                   <Check className="h-5 w-5" />
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
//               <textarea
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Ask a follow-up..."
//                 className="w-full bg-transparent text-foreground placeholder-muted-foreground resize-none border-none outline-none text-base leading-relaxed min-h-[24px] max-h-32 transition-all duration-200"
//                 rows={1}
//                 onInput={(e) => {
//                   const target = e.target as HTMLTextAreaElement
//                   target.style.height = "auto"
//                   target.style.height = target.scrollHeight + "px"
//                 }}
//               />

//               <div className="flex items-center justify-between mt-8">
//                 <div className="flex items-center gap-2">
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     className="h-8 w-8 p-0 text-foreground hover:bg-muted rounded-lg transition-all duration-200 hover:scale-110"
//                   >
//                     <Plus className="h-5 w-5" />
//                   </Button>

//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     className="h-8 w-8 p-0 text-foreground hover:bg-muted rounded-lg transition-all duration-200 hover:scale-110"
//                   >
//                     <Settings2 className="h-5 w-5" />
//                   </Button>

//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     onClick={handleMicClick}
//                     className="h-8 w-8 p-0 text-foreground hover:bg-muted rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 active:bg-red-600/20 active:text-red-400"
//                   >
//                     <Mic className="h-5 w-5 transition-transform duration-200" />
//                   </Button>

//                   <Button
//                     type="button"
//                     variant="secondary"
//                     size="sm"
//                     className="h-8 px-3 rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-200 hover:scale-105 bg-primary text-primary-foreground"
//                   >
//                     Agent
//                   </Button>
//                 </div>

//                 <Button
//                   type="submit"
//                   size="sm"
//                   disabled={!input.trim()}
//                   className="h-8 w-8 p-0 bg-muted hover:bg-muted/80 disabled:bg-muted/50 disabled:text-muted-foreground text-foreground rounded-lg transition-all duration-200 hover:scale-110 disabled:hover:scale-100"
//                 >
//                   <ArrowUp className="h-5 w-5" />
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </form>
//     </div>
//   )
// }

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function ChatInput({ onSend }: { onSend: (msg: string) => void }) {
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSend(input)
      setInput("")
    }
  }

  const handleMicClick = () => {
    setIsRecording(true)
    setTimeout(() => {
      setIsRecording(false)
      setInput("When speech to text feature ?")
    }, 5000)
  }

  const handleCancelRecording = () => {
    setIsRecording(false)
  }

  const handleConfirmRecording = () => {
    setIsRecording(false)
    setInput("When speech to text feature ?")
  }

  const WaveAnimation = () => {
    const [animationKey, setAnimationKey] = useState(0)

    useEffect(() => {
      const interval = setInterval(() => {
        setAnimationKey((prev) => prev + 1)
      }, 100)
      return () => clearInterval(interval)
    }, [])

    const bars = Array.from({ length: 20 }, (_, i) => {
      const height = Math.random() * 20 + 4
      return (
        <div
          key={`${i}-${animationKey}`}
          className="bg-muted-foreground rounded-sm animate-pulse"
          style={{
            width: "2px",
            height: `${height}px`,
            animationDuration: "1s",
          }}
        />
      )
    })

    return (
      <div className="flex items-center w-full gap-1">
        <div className="flex-1 border-t-2 border-dotted border-muted"></div>
        <div className="flex items-center gap-0.5 justify-center px-8">{bars}</div>
        <div className="flex-1 border-t-2 border-dotted border-muted"></div>
      </div>
    )
  }

  return (
    <div className="relative h-auto min-h-[60px] max-h-[120px]">
      <form onSubmit={handleSubmit} className="relative h-full">
        <div className="border border-border rounded-2xl p-3 relative transition-all duration-500 ease-in-out overflow-hidden bg-background h-full flex flex-col justify-center">
          {isRecording ? (
            <div className="flex items-center justify-between h-8 animate-in fade-in-0 slide-in-from-top-2 duration-500 w-full">
              <WaveAnimation />
              <div className="flex items-center gap-2 ml-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelRecording}
                  className="h-8 w-8 p-0 text-foreground hover:bg-muted rounded-lg transition-all duration-200 hover:scale-110"
                >
                  ✕
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleConfirmRecording}
                  className="h-8 w-8 p-0 rounded-lg transition-all duration-200 hover:scale-110 bg-primary text-primary-foreground"
                >
                  ✓
                </Button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-transparent text-foreground placeholder-muted-foreground resize-none border-none outline-none text-base leading-relaxed h-6 max-h-16 overflow-y-auto"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = "24px"
                  const newHeight = Math.min(target.scrollHeight, 64)
                  target.style.height = newHeight + "px"
                }}
              />

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-foreground hover:bg-muted rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    +
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-foreground hover:bg-muted rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    ⚙
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleMicClick}
                    className="h-8 w-8 p-0 text-foreground hover:bg-muted rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    🎤
                  </Button>
                </div>

                <Button
                  type="submit"
                  size="sm"
                  disabled={!input.trim()}
                  className="h-8 w-8 p-0 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground rounded-lg transition-all duration-200 hover:scale-110 disabled:hover:scale-100"
                >
                  ↑
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
