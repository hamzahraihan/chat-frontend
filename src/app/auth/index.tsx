import { useState } from "react";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import "./auth.css";

export default function AuthPage() {
  const [page, setPage] = useState<"login" | "register">("login");

  return (
    <div className="auth-container">
      {page == "login" ? (
        <div className="auth-card">
          <LoginPage />
          <button onClick={() => setPage("register")}>Register</button>
        </div>
      ) : (
        <div className="auth-card">
          <RegisterPage />
          <button onClick={() => setPage("login")}>Login</button>
        </div>
      )}
    </div>
  );
}
