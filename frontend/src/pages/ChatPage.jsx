// src/pages/ChatPage.jsx
import React from 'react';
import SideDrawer from '../components/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';
import './ChatPage.css'; // Optional: for layout

const ChatPage = () => {
  return (
    <div className="chatPage">
      <SideDrawer />
      <div className="chatContainer">
        <MyChats />
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatPage;
