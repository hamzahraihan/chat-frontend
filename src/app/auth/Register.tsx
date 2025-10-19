import { useAuthContext } from "../../hooks/useAuthContext";

export default function RegisterPage() {
  const { setUsername, setPassword, username, password } = useAuthContext();

  return (
    <div className="auth-container">
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
        <button>Register</button>
      </div>
    </div>
  );
}
