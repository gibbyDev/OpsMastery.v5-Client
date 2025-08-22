import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '@/lib/store/authSlice';

export function useChatSocket(chatId: string) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [messages, setMessages] = useState<{ sender_username: string; content: string }[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!chatId || !accessToken) return;

    const ws = new WebSocket(`ws://localhost:5000/ws?chatId=${chatId}&token=${accessToken}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Frontend: WebSocket connection opened');
    };
    ws.onmessage = (event) => {
      console.log('Received message:', event.data); // Add this log
      try {
        const msg = JSON.parse(event.data);
        setMessages(prev => [...prev, msg]);
      } catch (err) {
        console.error('Failed to parse message:', event.data, err);
      }
    };
    ws.onerror = (event) => {
      console.error('Frontend: WebSocket error', event);
    };
    ws.onclose = (event) => {
      console.warn('Frontend: WebSocket closed', event);
      wsRef.current = null;
    };

    return () => {
      ws.close();
    };
  }, [chatId, accessToken]);

  const sendMessage = (content: string) => {
    if (
      wsRef.current &&
      wsRef.current.readyState === WebSocket.OPEN &&
      content.trim()
    ) {
      wsRef.current.send(JSON.stringify({
        content,
        sender_username: myUsername,
      }));
    } else {
      console.warn('Frontend: WebSocket not open or missing data', {
        wsState: wsRef.current?.readyState,
        content,
      });
    }
  };

  return { messages, sendMessage };
}