import { useCallback, useEffect, useState, useMemo } from "react";
import type { IChatMessage } from "../../types/ChatMessage";
import { useChatContext } from "../../hooks/useChatContext";
import { useWebSocket } from "../../hooks/useWebSocket";
import { MessageList } from "../../components/MessageList";
import { MessageInput } from "../../components/MessageInput";

export default function ChatRoom() {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const { username, setUsername, roomId, setRoomId } = useChatContext();

  const handleMessage = useCallback(
    (topic: string, msg: IChatMessage) => {
      if (topic == `/topic/room.${roomId}`) {
        setMessages((prev) => [...prev, msg]);
      } else if (topic == "/user/queue/messages") {
        setMessages((prev) => [...prev, msg]);
      }
    },
    [roomId],
  );

  const resetSession = () => {
    setUsername("");
    setRoomId("");
  };

  const topics = useMemo(
    () => [`/topic/room.${roomId}`, "/user/queue/messages", "/topic/presence"],
    [roomId],
  );

  const ws = useWebSocket({
    url: "http://localhost:8080/ws",
    topics,
    username: username,
    onMessage: handleMessage,
  });

  useEffect(() => {
    console.log(`Setting up chat room for ${roomId} with user ${username}`);

    // Connect WebSocket
    ws.connect();

    // load chat history via rest
    fetch(`http://localhost:8080/api/rooms/${roomId}/history`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data: IChatMessage[]) => {
        console.log(data);
        setMessages(data);
      })
      .catch((err) => console.error(err));

    // Cleanup function
    return () => {
      console.log(`Cleaning up chat room for ${roomId}`);
      ws.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, username]);

  const sendChat = (text: string) => {
    const dto = { sender: username, content: text, roomId };
    ws.sendMessage(`/app/chat.send.${roomId}`, dto);
  };

  return (
    <div>
      <button onClick={resetSession}>reset session</button>
      <h3>Room: {roomId}</h3>
      <MessageList messages={messages} />
      <MessageInput onSend={sendChat} />
    </div>
  );
}
