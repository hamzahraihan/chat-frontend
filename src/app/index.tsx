import { useAuthContext } from "../hooks/useAuthContext";
import { useChatContext } from "../hooks/useChatContext";
import AuthPage from "./auth";
import ChatRoom from "./chatroom";
import Lobby from "./landing";
import RootLayout from "./layout";

function App() {
  const { token } = useAuthContext();
  const { username, receiver, roomId } = useChatContext();
  console.log(token);

  if (!token) {
    return (
      <RootLayout>
        <AuthPage />
      </RootLayout>
    );
  } else if (token && username == "" && roomId == "" && receiver == "") {
    return (
      <RootLayout>
        <Lobby />
      </RootLayout>
    );
  } else {
    return (
      <RootLayout>
        <ChatRoom />
      </RootLayout>
    );
  }
}

export default App;
