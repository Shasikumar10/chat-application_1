// src/context/ChatProvider.jsx
import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <ChatContext.Provider value={{ user, login, logout }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useAuth = () => useContext(ChatContext);
