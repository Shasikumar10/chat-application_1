import React, { useEffect, useState } from "react";
import axios from "axios";

const MyChats = ({ selectedChat, setSelectedChat }) => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const token = localStorage.getItem("token"); // Adjust to your storage logic

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("http://localhost:5000/api/chat", config);
    setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="card p-3">
      <h5>My Chats</h5>
      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => setSelectedChat(chat)}
          className={`chat-item p-2 my-2 border rounded ${selectedChat?._id === chat._id ? "bg-primary text-white" : ""}`}
          style={{ cursor: "pointer" }}
        >
          {chat.isGroupChat ? chat.chatName : chat.users.find((u) => u._id !== JSON.parse(localStorage.getItem("user"))._id).name}
        </div>
      ))}
    </div>
  );
};

export default MyChats;
