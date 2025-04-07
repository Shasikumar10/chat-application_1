import React, { useState, useEffect } from 'react';
import socket from '../socket';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const chatId = "general"; // In real app, this should be dynamic

  useEffect(() => {
    socket.emit("join_chat", chatId);

    socket.on("receive_message", (msg) => {
      setChatMessages((prev) => [...prev, { sender: "other", text: msg }]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send_message", { chatId, message });
    setChatMessages((prev) => [...prev, { sender: "you", text: message }]);
    setMessage('');
  };

  return (
    <div className="card p-3">
      <h5>Chat Window</h5>
      <div className="chat-messages mb-3" style={{ height: '300px', overflowY: 'auto' }}>
        {chatMessages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="d-flex">
        <input
          className="form-control me-2"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
