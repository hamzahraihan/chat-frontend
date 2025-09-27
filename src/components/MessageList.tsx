import type { IChatMessage } from "../types/ChatMessage";

export const MessageList = ({ messages }: { messages: IChatMessage[] }) => {
  return (
    <ul>
      {messages.map((msg) => (
        <li key={msg.id ?? msg.timestamp}>
          <strong>{msg.sender}</strong>: {msg.content}
          <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
        </li>
      ))}
    </ul>
  );
};
