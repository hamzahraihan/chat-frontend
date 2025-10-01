import { useChatContext } from "../hooks/useChatContext";
import ChatRoom from "./chatroom";
import Lobby from "./landing";

function App() {
  const { username, roomId } = useChatContext();
  console.log(username, roomId);

  return <div>{username == "" && roomId == "" ? <Lobby /> : <ChatRoom />}</div>;
}

export default App;
