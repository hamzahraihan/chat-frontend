import { useState } from "react";

export const MessageInput = ({ onSend }: { onSend: (txt: string) => void }) => {
  const [text, setText] = useState("");
  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          onSend(text);
          setText("");
        }}
      >
        send
      </button>
    </div>
  );
};
