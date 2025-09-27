import { createContext, useState } from "react";

type ChatProviderProps = {
  username: string;
  roomId: string;
};

const initialState: ChatProviderProps = {
  username: "",
  roomId: "",
};

export const ChatProviderContext =
  createContext<ChatProviderProps>(initialState);

export function ChatProvider({
  username,
  roomId,
}: Readonly<ChatProviderProps>) {
  const [user, setUser] = useState(() => localStorage.getItem(username));
}
