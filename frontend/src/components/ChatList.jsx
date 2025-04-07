// src/components/ChatList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ChatList.css";

const ChatList = ({ selectedChat, setSelectedChat, user }) => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("http://localhost:5000/api/chat", config);
      setChats(data);
    } catch (error) {
      console.log("Failed to load chats", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const getSenderName = (chat) => {
    return chat.isGroupChat
      ? chat.chatName
      : chat.users.find((u) => u._id !== user._id)?.name;
  };

  return (
    <div className="chat-list">
      <h3>My Chats</h3>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className={`chat-item ${selectedChat?._id === chat._id ? "selected" : ""}`}
          onClick={() => setSelectedChat(chat)}
        >
          <strong>{getSenderName(chat)}</strong>
          {chat.latestMessage && (
            <p>
              <small>
                <b>{chat.latestMessage.sender.name}:</b> {chat.latestMessage.content}
              </small>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
