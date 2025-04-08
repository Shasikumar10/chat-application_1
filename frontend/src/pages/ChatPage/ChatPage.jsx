import React from 'react';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import ChatBox from '../../components/ChatBox/ChatBox';

const ChatPage = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SideDrawer />
      <ChatBox />
    </div>
  );
};

export default ChatPage;
