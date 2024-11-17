import express from 'express';
import ConnectDB from './db/index.js';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import UserRoute from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js';
import Message from './models/messageModel.js';

dotenv.config();
ConnectDB();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"],
  },
});

const users = {}; // Store active users with their socket IDs

app.get('/', (req, res) => {
  res.send('Socket.IO Backend Running');
});

app.use('/api', UserRoute); 
app.use('/api/v1', messageRoute);

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("register", (username) => {
      users[username] = socket.id;
      console.log(`${username} connected with socket ID ${socket.id}`);
  });

  socket.on("sendPrivateMessage", async ({ recipient, message }) => {
      const recipientSocketId = users[recipient];
      const sender = Object.keys(users).find(key => users[key] === socket.id);

      // Save the message in MongoDB
      const newMessage = new Message({ sender, recipient, message });
      await newMessage.save();

      // Emit the message to the recipient and sender
      if (recipientSocketId) {
          io.to(recipientSocketId).emit("receiveMessage", { sender, recipient, message });
      }
      socket.emit("receiveMessage", { sender, recipient, message });
      console.log(`Message sent to ${recipient}`);
  });

  socket.on("disconnect", () => {
      for (const [username, id] of Object.entries(users)) {
          if (id === socket.id) {
              delete users[username];
              console.log(`${username} disconnected`);
          }
      }
  });
});

const PORT = process.env.PORT || 5003;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
