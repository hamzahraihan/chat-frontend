import { createContext, useContext } from "react";

type AuthProviderProps = {
  username: string;
  password: string;
};

const initialState: AuthProviderProps = {
  username: "",
  password: "",
};

export const AuthContext = createContext<AuthProviderProps>(initialState);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuthContext must be used within a AuthProvider");

  return context;
};
