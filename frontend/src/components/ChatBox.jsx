// src/components/ChatBox.jsx
import React, { useState } from 'react';

const ChatBox = () => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (!message.trim()) return;
    console.log("Sending message:", message);
    setMessage('');
  };

  return (
    <div className="card p-3">
      <h5>Chat Window</h5>
      <div className="chat-messages mb-3" style={{ height: '300px', overflowY: 'auto', backgroundColor: '#f9f9f9' }}>
        <div className="mb-2"><strong>You:</strong> Hello!</div>
        <div className="mb-2"><strong>John:</strong> Hi there!</div>
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
