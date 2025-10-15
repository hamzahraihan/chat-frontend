import { useAuthContext } from "../hooks/useAuthContext";
import { useChatContext } from "../hooks/useChatContext";
import LoginPage from "./auth/Login";
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
        <LoginPage />
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
