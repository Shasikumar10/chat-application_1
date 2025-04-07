import React, { useState, useEffect } from "react";
import socket from "../socket";

const ChatBox = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMsg = { content: message, sender: user };
      socket.emit("new message", newMsg);
      setMessages((prev) => [...prev, newMsg]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("message received", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => {
      socket.off("message received");
    };
  }, []);

  return (
    <div>
      <div className="chat-box border rounded p-3 mb-3" style={{ height: "300px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender._id === user._id ? "text-end" : "text-start"}>
            <span className="badge bg-secondary">{msg.sender.name}:</span>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="d-flex">
        <input
          className="form-control me-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
