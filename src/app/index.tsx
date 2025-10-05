import { useChatContext } from "../hooks/useChatContext";
import ChatRoom from "./chatroom";
import Lobby from "./landing";
import RootLayout from "./layout";

function App() {
  const { username, receiver, roomId } = useChatContext();
  console.log(username, roomId);

  return (
    <RootLayout>
      {username == "" && roomId == "" && receiver == "" ? (
        <Lobby />
      ) : (
        <ChatRoom />
      )}
    </RootLayout>
  );
}

export default App;
