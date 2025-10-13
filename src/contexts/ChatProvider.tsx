import { useState, type ReactNode } from "react";
import { ChatContext } from "../hooks/useChatContext";
import { USERNAME_KEY, ROOMID_KEY, RECEIVER_KEY } from "../constants/key";

export function ChatProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState(
    () => localStorage.getItem(USERNAME_KEY) || "",
  );
  const [receiver, setReceiver] = useState(
    () => localStorage.getItem(RECEIVER_KEY) || "",
  );
  const [roomId, setRoomId] = useState(
    () => localStorage.getItem(ROOMID_KEY) || "",
  );

  const value = {
    username,
    setUsername: (username: string) => {
      localStorage.setItem(USERNAME_KEY, username);
      setUsername(username);
    },
    receiver,
    setReceiver: (receiver: string) => {
      localStorage.setItem(RECEIVER_KEY, receiver);
      setReceiver(receiver);
    },
    roomId,
    setRoomId: (roomId: string) => {
      localStorage.setItem(ROOMID_KEY, roomId);
      setRoomId(roomId);
    },
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
