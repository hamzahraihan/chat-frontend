import { createContext, useContext } from "react";

type AuthProviderProps = {
  username: string;
  password: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  token: string | null;
  handleLogin: () => void;
};

const initialState: AuthProviderProps = {
  username: "",
  password: "",
  setUsername: () => null,
  setPassword: () => null,
  token: "",
  handleLogin: () => null,
};

export const AuthContext = createContext<AuthProviderProps>(initialState);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuthContext must be used within a AuthProvider");

  return context;
};
