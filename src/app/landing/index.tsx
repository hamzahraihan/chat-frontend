import { useState } from "react";
import { useChatContext } from "../../hooks/useChatContext";
import "./landing.css";

export default function Landing() {
  const { setRoomId, setUsername } = useChatContext();
  const [chat, setChat] = useState({ username: "", roomId: "" });

  const handleUsernameAndRoom = () => {
    console.log(chat);
    setUsername(chat.username);
    setRoomId(chat.roomId);
  };

  return (
    <div>
      <div>
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
      <div>
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
      <button onClick={handleUsernameAndRoom}>confirm</button>
    </div>
  );
}
