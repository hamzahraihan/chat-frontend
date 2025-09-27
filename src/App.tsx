import { useState } from "react";
import ChatRoom from "./components/ChatRoom";
import Lobby from "./components/Lobby";

function App() {
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  return (
    <div>
      {username == "" && username == undefined ? (
        <ChatRoom username={username} roomId={room} />
      ) : (
        <Lobby />
      )}
    </div>
  );
}

export default App;
