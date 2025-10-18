import { useState } from "react";
import LoginPage from "./Login";
import RegisterPage from "./Register";

export default function AuthPage() {
  const [page, setPage] = useState<"login" | "register">("login");

  return (
    <div>
      {page == "login" ? (
        <div>
          <LoginPage />
          <button onClick={() => setPage("register")}>Register</button>
        </div>
      ) : (
        <div>
          <RegisterPage />
          <button onClick={() => setPage("login")}>Login</button>
        </div>
      )}
    </div>
  );
}
