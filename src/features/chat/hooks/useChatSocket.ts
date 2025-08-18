import { useEffect, useRef, useState } from 'react';

export function useChatSocket(wsBaseUrl: string, myUsername: string) {
  const [messages, setMessages] = useState<{ sender_username: string; content: string }[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !wsBaseUrl) return;

    const ws = new WebSocket(wsBaseUrl);
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
    };

    return () => {
      ws.close();
    };
  }, [wsBaseUrl, myUsername]);

  const sendMessage = (to: string, content: string) => {
    if (
      wsRef.current &&
      wsRef.current.readyState === WebSocket.OPEN &&
      content.trim() &&
      to
    ) {
      wsRef.current.send(JSON.stringify({
        to,
        content,
        sender_username: myUsername,
      }));
    } else {
      console.warn('Frontend: WebSocket not open or missing data', {
        wsState: wsRef.current?.readyState,
        to,
        content,
      });
    }
  };

  return { messages, sendMessage };
}