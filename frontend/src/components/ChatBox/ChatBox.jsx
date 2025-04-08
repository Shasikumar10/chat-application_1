import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';

const ChatBox = () => {
  const { selectedChat, user } = ChatState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
      setMessages(data);
    } catch (error) {
      console.error('Failed to load messages', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        '/api/message',
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config
      );

      setMessages([...messages, data]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  return (
    <div className="chat-box" style={{ width: '65%', padding: '10px' }}>
      {!selectedChat ? (
        <div>Select a chat to start messaging</div>
      ) : (
        <div>
          <div
            style={{
              height: '300px',
              overflowY: 'scroll',
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
            }}
          >
            {messages.map((msg) => (
              <div key={msg._id} style={{ margin: '5px 0' }}>
                <strong>{msg.sender.name}:</strong> {msg.content}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              style={{ width: '80%', padding: '8px' }}
            />
            <button type="submit" style={{ padding: '8px 12px', marginLeft: '8px' }}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
