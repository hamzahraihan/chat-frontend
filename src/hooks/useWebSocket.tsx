import { Client, type IMessage, type StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { IChatMessage } from "../types/ChatMessage";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";

interface UseWebSocketProps {
  url: string;
  topics: string[];
  onMessage: (topic: string, msg: IChatMessage) => void;
  username?: string;
}

export const useWebSocket = ({
  url,
  topics,
  onMessage,
  username,
}: UseWebSocketProps) => {
  const clientRef = useRef<Client | null>(null);
  const subsRef = useRef<Record<string, StompSubscription | null>>({});
  const [connected, setConnected] = useState(false);

  // Store current values in refs to avoid stale closures
  const topicsRef = useRef(topics);
  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    topicsRef.current = topics;
    onMessageRef.current = onMessage;
  });

  // Memoize the connect function to prevent unnecessary recreations
  const connect = useCallback(() => {
    if (clientRef.current?.connected) {
      console.log("Already connected, skipping...");
      return;
    }

    // Disconnect existing connection if any
    if (clientRef.current) {
      clientRef.current.deactivate();
    }

    const connectUrl = username
      ? `${url}?username=${encodeURIComponent(username)}`
      : url;

    console.log("Connecting to WebSocket...", connectUrl);
    const client = new Client({
      webSocketFactory: () => new SockJS(connectUrl),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("WebSocket connected!");
        setConnected(true);
        topicsRef.current.forEach((topic) => {
          console.log("Subscribing to topic:", topic);

          const sub = client.subscribe(topic, (message: IMessage) => {
            console.log("Raw STOMP message:", message);
            try {
              console.log(`Message received on ${topic}:`, message.body);
              const payload: IChatMessage = JSON.parse(message.body);

              console.log("Parsed message:", payload);
              onMessageRef.current(topic, payload);
            } catch (err) {
              console.error("failed parse", err);
            }
          });
          subsRef.current[topic] = sub;
        });
      },

      onDisconnect: () => {
        console.log("WebSocket disconnected");
        setConnected(false);
      },
      onStompError: (frame) => console.error("stomp error", frame),
      onWebSocketError: (ev) => console.error("ws error", ev),
    });

    client.activate();
    clientRef.current = client;
  }, [url, username]);

  const disconnect = useCallback(() => {
    if (!clientRef.current) return;
    console.log("Disconnecting WebSocket...");
    Object.values(subsRef.current).forEach((s) => s?.unsubscribe());
    subsRef.current = {};
    clientRef.current.deactivate();
    clientRef.current = null;
    setConnected(false);
  }, []);

  const sendMessage = useCallback(
    (
      destination: string,
      body: {
        sender: string;
        content: string;
        receiver?: string;
        roomId?: string;
      },
    ) => {
      if (!clientRef.current || !clientRef.current.connected) {
        console.warn("not connected");
        return;
      }
      clientRef.current.publish({ destination, body: JSON.stringify(body) });
    },
    [],
  );

  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  // Return memoized object to prevent unnecessary re-renders
  return useMemo(
    () => ({
      sendMessage,
      connect,
      connected,
      disconnect,
    }),
    [sendMessage, connect, connected, disconnect],
  );
};
