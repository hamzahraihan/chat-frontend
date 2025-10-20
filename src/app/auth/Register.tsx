import { useAuthContext } from "../../hooks/useAuthContext";

export default function RegisterPage() {
  const { setUsername, setPassword, username, password, handleRegister } =
    useAuthContext();

  return (
    <div className="">
      <h1>Register</h1>
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
        <button onClick={handleRegister}>Submit</button>
      </div>
    </div>
  );
}
