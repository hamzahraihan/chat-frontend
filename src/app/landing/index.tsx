import { useState } from "react";
import { useChatContext } from "../../hooks/useChatContext";
import "./landing.css";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Lobby() {
  const { setUsername, setToken } = useAuthContext();
  const { setRoomId, setReceiver } = useChatContext();
  const [chat, setChat] = useState({ roomId: "", receiver: "" });

  const handleUsernameRoomAndReceiver = () => {
    console.log(chat);
    setRoomId(chat.roomId);
    setReceiver(chat.receiver);
  };

  const handleLogout = () => {
    setToken("");
    setUsername("");
  };

  return (
    <div className="container">
      <div className="form-card">
        <div className="form-input">
          <p>room</p>
          <input
            type="text"
            value={chat.roomId}
            name="roomId"
            onChange={(e) => {
              setChat((prev) => ({ ...prev, [e.target.name]: e.target.value }));
            }}
          />
        </div>
        <div className="form-input">
          <p>Receiver</p>
          <input
            type="text"
            value={chat.receiver}
            name="receiver"
            onChange={(e) => {
              setChat((prev) => ({ ...prev, [e.target.name]: e.target.value }));
            }}
          />
        </div>
        <button onClick={handleUsernameRoomAndReceiver}>confirm</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
