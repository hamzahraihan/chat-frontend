import { useEffect, type Dispatch, type SetStateAction } from 'react';
import type { WebSocketType } from '.';
import { MessageInput } from '../../components/MessageInput';
import type { IChatMessage } from '../../types/ChatMessage';
import { MessageList } from '../../components/MessageList';

export default function PrivateChat({
  messages,
  username,
  receiver,
  ws,
  sendPrivateChat,
  setMessages,
}: {
  messages: IChatMessage[];
  username: string;
  receiver: string;
  sendPrivateChat: (text: string) => void;
  ws: WebSocketType;
  setMessages: Dispatch<SetStateAction<IChatMessage[]>>;
}) {
  useEffect(() => {
    console.log(`Setting up private chat room for ${username} with user ${receiver}`);

    // Connect WebSocket
    ws.connect();

    // Load chat history from API only if we don't have messages already
    if (messages.length === 0) {
      fetch(`http://localhost:8080/api/users/${username}/${receiver}/history`)
        .then((res) => {
          console.log('API response status:', res);
          return res.json();
        })
        .then((data: IChatMessage[]) => {
          console.log('Loaded private chat history:', data);
          setMessages(data);
        })
        .catch((err) => console.error('Failed to load chat history:', err));
    }

    // Cleanup function
    return () => {
      console.log(`Cleaning up chat room for ${receiver}`);
      ws.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiver, username]);

  return (
    <div>
      <p>Receiver: {receiver}</p>
      <MessageList messages={messages} />
      <MessageInput onSend={sendPrivateChat} />
    </div>
  );
}
