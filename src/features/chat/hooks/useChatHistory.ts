// // src/features/chat/hooks/useChatHistory.ts
// import { useState, useEffect } from "react";
// import { useAuthStore } from "@/lib/store/authSlice";

// export function useChatHistory(chatId: string) {
//   const accessToken = useAuthStore((state) => state.accessToken);
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!chatId || !accessToken) return;
//     setLoading(true);
//     fetch(`/api/v1/chats/${chatId}/messages`, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//       credentials: "include",
//     })
//       .then((res) => res.ok ? res.json() : [])
//       .then(setMessages)
//       .finally(() => setLoading(false));
//   }, [chatId, accessToken]);

//   return { messages, loading };
// }