import React, { useState } from 'react';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput('');
  };

  return (
    <div style={{ width: '75%', padding: '20px', backgroundColor: '#fff' }}>
      <h2>Chat Box</h2>
      <div style={{ height: '70vh', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ margin: '10px 0' }}>{msg}</div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '80%', padding: '10px' }}
        />
        <button onClick={sendMessage} style={{ padding: '10px 20px' }}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
