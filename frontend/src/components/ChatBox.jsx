// src/components/ChatBox.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ChatBox.css";

const ChatBox = ({ selectedChat, user }) => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
    } catch (error) {
      console.log("Error fetching messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  return (
    <div className="chat-box">
      {selectedChat ? (
        <>
          <h3 className="chat-title">
            {selectedChat.isGroupChat
              ? selectedChat.chatName
              : selectedChat.users.find((u) => u._id !== user._id)?.name}
          </h3>

          <div className="messages-container">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`message ${
                  msg.sender._id === user._id ? "sent" : "received"
                }`}
              >
                <span>{msg.sender.name}</span>
                <p>{msg.content}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-chat">Select a chat to start messaging</div>
      )}
    </div>
  );
};

export default ChatBox;
