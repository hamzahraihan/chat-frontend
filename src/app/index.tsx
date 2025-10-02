import { useChatContext } from "../hooks/useChatContext";
import ChatRoom from "./chatroom";
import Lobby from "./landing";

function App() {
  const { username, receiver, roomId } = useChatContext();
  console.log(username, roomId);

  return (
    <div>
      {username == "" && roomId == "" && receiver == "" ? (
        <Lobby />
      ) : (
        <ChatRoom />
      )}
    </div>
  );
}

export default App;
