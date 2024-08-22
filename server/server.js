    const express = require('express') ; 
const cookieParser = require('cookie-parser');

const app = express() ; 

require('dotenv').config() ;
const cors = require('cors') // This is new
const port = process.env.PORT;

// Middleware
app.use(cookieParser());
// Change the app.use(cors()) to the one below
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json()); // This is new
app.use(express.urlencoded({ extended: true })); // This is new


require('./config/mongoose.config');
//routes 
require('./routers/main.route')(app); 
require("./routers/message.route")(app);
require('./routers/post.route')(app); 
require('./routers/follow.route')(app); 
require("./routers/like.route")(app); 
require("./routers/comment.route")(app) ;


const server = app.listen(port, () => console.log(`Listening on port: ${port}`) );


const io = require('socket.io')(server, { cors: true });

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
  
    // Join a unique room between two users
    socket.on('joinRoom', ({ userId1, userId2 }) => {
      const roomName = generateRoomName(userId1, userId2);
      socket.join(roomName);
      console.log(`${socket.id} joined room: ${roomName}`);
    });
  
    // Handle private messages between two users
    socket.on('privateMessage', ({ userId1, userId2, message }) => {
      const roomName = generateRoomName(userId1, userId2);
      io.to(roomName).emit('message', message);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
  
  function generateRoomName(userId1, userId2) {
    const sortedIds = [userId1, userId2].sort();
    return `room-${sortedIds[0]}-${sortedIds[1]}`;
  }


  





