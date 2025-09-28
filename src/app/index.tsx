import ChatRoom from "../components/ChatRoom";
import { useChatContext } from "../hooks/useChatContext";
import Lobby from "./landing";

function App() {
  const { username, roomId } = useChatContext();
  console.log(username, roomId);

  return <div>{username == "" && roomId == "" ? <Lobby /> : <ChatRoom />}</div>;
}

export default App;
