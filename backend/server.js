const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const chatRoutes = require("./routes/chatRoutes");
app.use("/api/chat", chatRoutes);

// Setup API Routes
app.use("/api/chat", require("./routes/chatRoutes"));
// Your API routes here (if needed, e.g., user routes)
// app.use("/api/user", require("./routes/userRoutes"));

const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // In production, specify frontend origin
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // Join Chat Room
  socket.on("join_chat", (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });

  // Listen for message
  socket.on("send_message", (data) => {
    const { chatId, message } = data;
    console.log("📨 Message received:", message);
    io.to(chatId).emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
