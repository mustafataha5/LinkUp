// Import required modules
const express = require('express');
const cookieParser = require('cookie-parser');
const http = require('http');
const cors = require('cors');
const io = require('socket.io');
require('dotenv').config();

// Create an Express application
const app = express();
const server = http.createServer(app);

// Configure Socket.io with CORS settings
const socketIo = io(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://your-public-ip-or-domain'], // Add your public IP or domain here
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'http://51.20.56.131/'] // Add your public IP or domain here
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database configuration
require('./config/mongoose.config');

// Routes
require('./routers/main.route')(app);
require("./routers/message.route")(app);
require('./routers/post.route')(app);
require('./routers/follow.route')(app);
require("./routers/like.route")(app);
require("./routers/comment.route")(app);

// Socket.io events
socketIo.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("activeUser", (data) => {
    console.log("-------", data);
    const { userId, status } = data; 
    socket.broadcast.emit("status", userId); 
  });

  // Listen for the 'joinRoom' event
  socket.on('joinRoom', ({ senderId, reciverId }) => {
    const roomName = generateRoomName(senderId, reciverId);
    socket.join(roomName);
    console.log(`${socket.id} joined room: ${roomName}`);
  });

  // Listen for the 'privateMessage' event
  socket.on('privateMessage', ({ senderId, reciverId, message }) => {
    console.log(senderId, " send ", reciverId);
    const roomName = generateRoomName(senderId, reciverId);
    console.log(` ${roomName} --- message emit ${message.content}`);
    socketIo.to(roomName).emit('message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Helper function to generate a unique room name
function generateRoomName(senderId, reciverId) {
  return [senderId, reciverId].sort().join('_');
}

// Start the server
const port = process.env.PORT || 8000;
server.listen(port, '0.0.0.0', () => console.log(`Listening on port: ${port}`)); // Bind to 0.0.0.0 to accept connections from public IPs
