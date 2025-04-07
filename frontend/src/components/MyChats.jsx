import React, { useEffect } from 'react';
import axios from 'axios';
import { ChatState } from '../context/ChatProvider';

const MyChats = () => {
  const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get('/api/chat', config);
      setChats(data);
    } catch (error) {
      console.error('Failed to load chats:', error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="chat-list" style={{ padding: '10px', width: '35%', borderRight: '1px solid #ccc' }}>
      <h3>My Chats</h3>
      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => setSelectedChat(chat)}
          style={{
            padding: '8px',
            margin: '5px 0',
            background: selectedChat?._id === chat._id ? '#38B2AC' : '#E8E8E8',
            color: selectedChat?._id === chat._id ? 'white' : 'black',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {chat.isGroupChat ? chat.chatName : chat.users.find((u) => u._id !== user._id).name}
        </div>
      ))}
    </div>
  );
};

export default MyChats;
