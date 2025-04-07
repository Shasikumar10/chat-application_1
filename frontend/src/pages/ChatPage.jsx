import React, { useState } from "react";
import ChatList from "../components/ChatList";
import ChatBox from "../components/ChatBox";

const ChatPage = ({ user }) => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div style={{ display: "flex" }}>
      <ChatList
        user={user}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
      <ChatBox selectedChat={selectedChat} user={user} />
    </div>
  );
};

export default ChatPage;
