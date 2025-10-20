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

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        throw new Error(`Response message: ${result.message}`);
      }

      // set username to localstorage
      localStorage.setItem(USERNAME_KEY, username);

      // set token to localstorage
      localStorage.setItem(TOKEN_KEY, result.token);
      setToken(result.token);
      setPassword("");
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        throw new Error(`Response message: ${result.message}`);
      }

      // set username to localstorage
      localStorage.setItem(USERNAME_KEY, username);

      localStorage.setItem(TOKEN_KEY, result.token);
      setToken(result.token);
      setPassword("");
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const value = {
    username,
    setUsername: (username: string) => {
      localStorage.setItem(USERNAME_KEY, username);
      setUsername(username);
    },
    password,
    setPassword: (password: string) => setPassword(password),
    token,
    setToken: (token: string) => {
      localStorage.setItem(TOKEN_KEY, token);
      setToken(token);
    },
    handleLogin,
    handleRegister,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
