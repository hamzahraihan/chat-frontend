import { useState } from "react";

export default function RegisterPage() {
  return (
    <div className="login-container">
      <div className="login-card">
        <input type="text" placeholder="username.." />
        <input type="password" placeholder="password.." />
        <button>Register</button>
      </div>
    </div>
  );
}
