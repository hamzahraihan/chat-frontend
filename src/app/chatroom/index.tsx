import { useCallback, useState, useMemo, useEffect } from 'react';
import type { IChatMessage } from '../../types/ChatMessage';
import type { PresenceMessage } from '../../types/PresenceMessage';
import { useChatContext } from '../../hooks/useChatContext';
import { useWebSocket } from '../../hooks/useWebSocket';
import { usePresence } from '../../hooks/usePresence';
import PublicChat from './PublicChat';
import PrivateChat from './PrivateChat';
import './chat.css';

export type WebSocketType = {
  sendMessage: (
    destination: string,
    body: {
      sender: string;
      content: string;
      receiver?: string;
      roomId?: string;
      timestamp?: string;
    }
  ) => void;
  connect: () => void;
  connected: boolean;
  disconnect: () => void;
};

export default function ChatRoom() {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const { username, receiver, setUsername, roomId, setRoomId, setReceiver } = useChatContext();

  // Initialize presence tracking
  const presence = usePresence();

  // clean messages after disconnect from room and private chat
  useEffect(() => {
    setMessages([]);
  }, [receiver, roomId]);

  const handleMessage = useCallback(
    (topic: string, msg: IChatMessage | string) => {
      console.log('Received message on topic:', topic, 'Message:', msg);

      if (topic === `/topic/room.${roomId}`) {
        setMessages((prev) => [...prev, msg as IChatMessage]);
      }
      if (topic === '/user/queue/private') {
        setMessages((prev) => [...prev, msg as IChatMessage]);
      }
      // Handle presence updates
      if (topic === '/topic/presence') {
        try {
          const presenceMsg = typeof msg === 'string' ? JSON.parse(msg) : msg;
          presence.handlePresenceUpdate(presenceMsg as PresenceMessage);
        } catch (error) {
          console.error('Failed to parse presence message:', error);
        }
      }
    },
    [roomId, presence]
  );

  const resetSession = () => {
    setUsername('');
    setRoomId('');
    setReceiver('');
  };

  const topics = useMemo(() => [`/topic/room.${roomId}`, `/topic/presence`, '/user/queue/private'], [roomId]);

  const ws: WebSocketType = useWebSocket({
    url: 'http://localhost:8080/ws',
    topics,
    username: username,
    onMessage: handleMessage,
  });

  const sendChat = (text: string) => {
    const dto: IChatMessage = {
      sender: username,
      content: text,
      roomId,
      type: 'CHAT',
      timestamp: new Date().toISOString(),
    };
    ws.sendMessage(`/app/chat.send.${roomId}`, dto);
  };

  const sendPrivateChat = (text: string) => {
    const dto: IChatMessage = {
      sender: username,
      receiver: receiver,
      type: 'PRIVATE',
      content: text,
      timestamp: new Date().toISOString(),
    };
    ws.sendMessage('/app/chat.private', dto);
  };

  return (
    <div className="room-container">
      <button onClick={resetSession}>reset session</button>
      {roomId && receiver && (
        <div className="chat-container">
          <PublicChat messages={messages} username={username} roomId={roomId} sendChat={sendChat} setMessages={setMessages} ws={ws} />

          <PrivateChat username={username} messages={messages} setMessages={setMessages} sendPrivateChat={sendPrivateChat} receiver={receiver} ws={ws} isReceiverOnline={presence.isUserOnline(receiver)} />
        </div>
      )}

      {roomId && !receiver && <PublicChat messages={messages} username={username} roomId={roomId} sendChat={sendChat} setMessages={setMessages} ws={ws} />}

      {receiver && !roomId && <PrivateChat username={username} messages={messages} setMessages={setMessages} sendPrivateChat={sendPrivateChat} receiver={receiver} ws={ws} isReceiverOnline={presence.isUserOnline(receiver)} />}
    </div>
  );
}
