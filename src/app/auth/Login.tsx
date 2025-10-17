import { useAuthContext } from "../../hooks/useAuthContext";
import "./auth.css";

export default function LoginPage() {
  const { handleLogin, setPassword, setUsername, password, username } =
    useAuthContext();
  return (
    <div className="login-container">
      <div className="login-card">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username.."
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password.."
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
