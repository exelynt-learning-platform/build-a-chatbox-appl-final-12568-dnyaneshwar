import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../features/chat/chatSlice";
import Message from "./Message";
import Loader from "./Loader";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const { messages, loading, error } = useSelector((state) => state.chat);

  const handleSend = () => {
    if (!input.trim()) return;

    dispatch(sendMessage(input)); // ✅ single action

    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}
        {loading && <Loader />}
      </div>

      {error && <div className="error">{error}</div>}

      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;