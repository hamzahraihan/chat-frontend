import { createContext, useContext } from "react";

type AuthProviderProps = {
  username: string;
  password: string;
  token: string | null;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setToken: (token: string) => void;
  handleLogin: () => void;
  handleRegister: () => void;
};

const initialState: AuthProviderProps = {
  username: "",
  password: "",
  token: "",
  setUsername: () => null,
  setPassword: () => null,
  setToken: () => null,
  handleLogin: () => null,
  handleRegister: () => null,
};

export const AuthContext = createContext<AuthProviderProps>(initialState);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuthContext must be used within a AuthProvider");

  return context;
};
