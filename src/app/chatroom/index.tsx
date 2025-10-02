import { useCallback, useState, useMemo, useEffect } from "react";
import type { IChatMessage } from "../../types/ChatMessage";
import { useChatContext } from "../../hooks/useChatContext";
import { useWebSocket } from "../../hooks/useWebSocket";
import PublicChat from "./PublicChat";
import PrivateChat from "./PrivateChat";

export type WebSocketType = {
  sendMessage: (
    destination: string,
    body: {
      sender: string;
      content: string;
      receiver?: string;
      roomId?: string;
    },
  ) => void;
  connect: () => void;
  connected: boolean;
  disconnect: () => void;
};

export default function ChatRoom() {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  // send a message to receiver
  const { username, receiver, setUsername, roomId, setRoomId, setReceiver } =
    useChatContext();

  // clean messages after disconnect from room and private chat
  useEffect(() => {
    setMessages([]);
  }, [receiver, roomId]);

  const handleMessage = useCallback(
    (topic: string, msg: IChatMessage) => {
      console.log("Received message on topic:", topic, "Message:", msg);

      if (topic === `/topic/room.${roomId}`) {
        setMessages((prev) => [...prev, msg]);
      }
      if (topic === "/user/topic/private") {
        setMessages((prev) => [...prev, msg]);
      }
    },
    [roomId],
  );

  const resetSession = () => {
    setUsername("");
    setRoomId("");
    setReceiver("");
  };

  const topics = useMemo(
    () => [`/topic/room.${roomId}`, `/topic/presence`, `/user/topic/private`],
    [roomId],
  );

  const ws: WebSocketType = useWebSocket({
    url: "http://localhost:8080/ws",
    topics,
    username: username,
    onMessage: handleMessage,
  });

  const sendChat = (text: string) => {
    const dto = { sender: username, content: text, roomId };
    ws.sendMessage(`/app/chat.send.${roomId}`, dto);
  };

  const sendPrivateChat = (text: string) => {
    const dto = { sender: username, receiver: receiver, content: text };
    ws.sendMessage("/app/chat.private", dto);
  };

  return (
    <div>
      <button onClick={resetSession}>reset session</button>
      {roomId ? (
        <PublicChat
          messages={messages}
          username={username}
          roomId={roomId}
          sendChat={sendChat}
          setMessages={setMessages}
          ws={ws}
        />
      ) : (
        <PrivateChat
          username={username}
          messages={messages}
          setMessages={setMessages}
          sendPrivateChat={sendPrivateChat}
          receiver={receiver}
          ws={ws}
        />
      )}
    </div>
  );
}
