// src/components/ChatPage.jsx
import React from 'react';
import MyChats from './MyChats';
import ChatBox from './ChatBox';
import SideDrawer from './SideDrawer';

const ChatPage = () => {
  return (
    <div className="container mt-4">
      <SideDrawer />
      <div className="row mt-3">
        <div className="col-md-4">
          <MyChats />
        </div>
        <div className="col-md-8">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
