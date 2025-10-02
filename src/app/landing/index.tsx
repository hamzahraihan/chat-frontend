import { useState } from "react";
import { useChatContext } from "../../hooks/useChatContext";
import "./landing.css";

export default function Landing() {
  const { setRoomId, setUsername, setReceiver } = useChatContext();
  const [chat, setChat] = useState({ username: "", roomId: "", receiver: "" });

  const handleUsernameRoomAndReceiver = () => {
    console.log(chat);
    setUsername(chat.username);
    setRoomId(chat.roomId);
    setReceiver(chat.receiver);
  };

  return (
    <div className="container">
      <div className="form-card">
        <div className="form-input">
          <p>username</p>
          <input
            type="text"
            value={chat.username}
            name="username"
            onChange={(e) => {
              setChat((prev) => ({ ...prev, [e.target.name]: e.target.value }));
            }}
          />
        </div>
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
      </div>
    </div>
  );
}
