// "use client";

// import { useRef, useEffect } from "react";
// import { ScrollArea } from "@/components/ui/scroll-area";

// type Message = {
//   id: string;
//   content: string;
//   sender: "user" | "assistant";
//   timestamp: Date;
// };

// type ChatMessagesProps = {
//   messages: Message[];
// };

// export default function ChatMessages({ messages }: ChatMessagesProps) {
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <ScrollArea className="flex-1 p-4">
//       <div className="space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex ${
//               message.sender === "user" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`max-w-[80%] rounded-2xl px-4 py-2 ${
//                 message.sender === "user"
//                   ? "bg-primary text-primary-foreground rounded-br-none"
//                   : "bg-muted rounded-bl-none"
//               }`}
//             >
//               <p>{message.content}</p>
//               <div
//                 className={`text-xs mt-1 ${
//                   message.sender === "user"
//                     ? "text-primary-foreground/70"
//                     : "text-muted-foreground"
//                 }`}
//               >
//                 {formatTime(message.timestamp)}
//               </div>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//     </ScrollArea>
//   );
// }

"use client"

import { useRef, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

type ChatMessagesProps = {
  messages: Message[]
  selectedChatUser?: { name: string }
}

export default function ChatMessages({ messages, selectedChatUser }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const formatTime = (date: Date) =>
    date instanceof Date
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : ""

  return (
    <ScrollArea className="flex-1 min-h-0 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-muted rounded-bl-none"
              }`}
            >
              <p>{message.content}</p>
              <div
                className={`text-xs mt-1 ${
                  message.sender === "user"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  )
}
