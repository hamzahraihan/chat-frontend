import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ChatProvider } from "./contexts/ChatProvider.tsx";
import App from "./app/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>
  </StrictMode>,
);
