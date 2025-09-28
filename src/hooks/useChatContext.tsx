import { createContext } from "react";

type ChatProviderProps = {
  username: string;
  setUsername: (username: string) => void;
  roomId: string;
  setRoomId: (roomId: string) => void;
};

const initialState: ChatProviderProps = {
  username: "",
  setUsername: () => null,
  roomId: "",
  setRoomId: () => null,
};

export const ChatContext = createContext<ChatProviderProps>(initialState);
