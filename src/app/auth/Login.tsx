import { useAuthContext } from "../../hooks/useAuthContext";
import "./auth.css";

export default function LoginPage() {
  const { handleLogin, setPassword, setUsername, password, username } =
    useAuthContext();
  return (
    <div className="">
      <h1>Login</h1>
      <div className="auth-card">
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
        <button onClick={handleLogin}>Submit</button>
      </div>
    </div>
  );
}
