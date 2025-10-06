import { createContext, useContext } from "react";

type ChatProviderProps = {
  username: string;
  receiver: string;
  roomId: string;
  setUsername: (username: string) => void;
  setReceiver: (receiver: string) => void;
  setRoomId: (roomId: string) => void;
};

const initialState: ChatProviderProps = {
  username: "",
  receiver: "",
  roomId: "",
  setUsername: () => null,
  setReceiver: () => null,
  setRoomId: () => null,
};

export const ChatContext = createContext<ChatProviderProps>(initialState);

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (context === undefined)
    throw new Error("useChatContext must be used within a ChatProvider");

  return context;
};
