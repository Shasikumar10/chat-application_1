import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ChatPage from './pages/ChatPage';
import ChatProvider from './context/ChatProvider';

const App = () => {
  return (
    <ChatProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chats" element={<ChatPage />} />
        </Routes>
      </Router>
    </ChatProvider>
  );
};

export default App;
