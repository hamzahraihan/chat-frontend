import { createContext, useContext } from "react";

type ChatProviderProps = {
  username: string;
  setUsername: (username: string) => void;
  receiver: string;
  setReceiver: (receiver: string) => void;
  roomId: string;
  setRoomId: (roomId: string) => void;
};

const initialState: ChatProviderProps = {
  username: "",
  setUsername: () => null,
  receiver: "",
  setReceiver: () => null,
  roomId: "",
  setRoomId: () => null,
};

export const ChatContext = createContext<ChatProviderProps>(initialState);

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (context === undefined)
    throw new Error("useChatContext must be used within a ChatProvider");

  return context;
};
