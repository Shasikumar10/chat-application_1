const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

// API Routes Setup
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Create HTTP Server
const server = http.createServer(app);

// Socket.IO Setup
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true,
  },
});

// Socket.IO Connection Handling
io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  // Setup user room (for private messaging)
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  // Join specific chat room
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Handle incoming message and broadcast
  socket.on("new message", (newMessage) => {
    const chat = newMessage.chat;
    if (!chat.users) return;

    // Emit message to all users in the chat
    chat.users.forEach((user) => {
      if (user._id === newMessage.sender._id) return; // Skip sender
      socket.in(user._id).emit("message received", newMessage);
    });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Server Listening
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
