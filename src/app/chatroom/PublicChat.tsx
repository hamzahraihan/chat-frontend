import { useEffect, type Dispatch, type SetStateAction } from "react";
import { MessageInput } from "../../components/MessageInput";
import { MessageList } from "../../components/MessageList";
import type { IChatMessage } from "../../types/ChatMessage";
import type { WebSocketType } from ".";

export default function PublicChat({
  messages,
  roomId,
  sendChat,
  username,
  ws,
  setMessages,
}: {
  messages: IChatMessage[];
  roomId: string;
  sendChat: (text: string) => void;
  ws: WebSocketType;
  username: string;
  setMessages: Dispatch<SetStateAction<IChatMessage[]>>;
}) {
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

  return (
    <div>
      <h3>Room: {roomId}</h3>
      <MessageList messages={messages} />
      <MessageInput onSend={sendChat} />
    </div>
  );
}
