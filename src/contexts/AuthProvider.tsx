import { useState, type ReactNode } from "react";
import { AuthContext } from "../hooks/useAuthContext";
import { TOKEN_KEY, USERNAME_KEY } from "../constants/key";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string>(
    () => localStorage.getItem(USERNAME_KEY) || "",
  );
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState(
    () => localStorage.getItem(TOKEN_KEY) || "",
  );

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      // set username to localstorage
      localStorage.setItem(USERNAME_KEY, username);

      // set token to localstorage
      const result = await response.json();
      localStorage.setItem(TOKEN_KEY, result.token);
      setToken(result.token);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const value = {
    username,
    setUsername: (username: string) => setUsername(username),
    password,
    setPassword: (password: string) => setPassword(password),
    token,
    handleLogin,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
