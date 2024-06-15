require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const socketAuthMiddleware = require("./middleware/socketAuthMiddleware");
const { encryptMessage, decryptMessage } = require("./utils/encryptionUtils");
const chatController = require("./controllers/chatController");

const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/auth", authRoutes);
app.use("/api/chat", chatRoutes);

io.use(socketAuthMiddleware);

io.on("connection", (socket) => {
  console.log("User connected:", socket.user.username);
  console.log("User connected:", socket.user.username);

  socket.on("joinRoom", (data) => {
    console.log("Joining room:", data);
    const { roomId } = data;
    console.log(`User ${socket.user.username} joining room ${roomId}`);
    socket.join(roomId);
    console.log(`User ${socket.user.username} joined room ${roomId}`);
  });

  socket.on("message", (data) => {
    console.log("Received message:", data);
    chatController.sendMessage(io, socket, data);
  });

  socket.on("image", (data) => {
    chatController.sendImage(io, socket, data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.user.username);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
