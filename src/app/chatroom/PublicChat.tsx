import { MessageInput } from "../../components/MessageInput";
import { MessageList } from "../../components/MessageList";
import type { IChatMessage } from "../../types/ChatMessage";

export default function PublicChat({
  messages,
  roomId,
  sendChat,
}: {
  messages: IChatMessage[];
  roomId: string;
  sendChat: (text: string) => void;
}) {
  return (
    <div>
      <h3>Room: {roomId}</h3>
      <MessageList messages={messages} />
      <MessageInput onSend={sendChat} />
    </div>
  );
}
