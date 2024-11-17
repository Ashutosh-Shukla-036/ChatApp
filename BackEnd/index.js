import express from 'express';
import ConnectDB from './db/index.js';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';  
import UserRoute from './routes/userRoute.js'

dotenv.config();
ConnectDB();

const app = express();
app.use(cors()); 
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { 
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"], 
  },
});

app.get('/', (req, res) => {
  res.send('Socket.IO Backend Running');
});

app.use('/api',UserRoute);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
