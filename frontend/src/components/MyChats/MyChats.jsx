import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyChats from '../../components/MyChats/MyChats';
import ChatBox from '../../components/ChatBox/ChatBox'; // If you have one
import { ChatState } from '../../context/ChatProvider'; // adjust path if needed
import './ChatPage.css';

const ChatPage = () => {
  const navigate = useNavigate();
  const { user } = ChatState();

  // Redirect to login if no user is found
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="chatPage">
      <div className="chat-container">
        <MyChats />
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatPage;
