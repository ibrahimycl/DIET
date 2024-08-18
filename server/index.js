const express = require("express");
const connection = require("./config/DB");
const authRoutes = require("./routes/authRoutes");
const packageRoutes = require("./routes/packageRoutes");
const communityRoutes = require("./routes/communityRoutes");
const foodRoutes = require("./routes/foodRoutes");
const profileRoutes = require("./routes/profileRoutes");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const cronJob = require("./jobs/dailyJobs");
const cors = require('cors');
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const Server = require('socket.io');



dotenv.config();
const app = express();

app.use(cors());

app.use(cookieParser());



// database connection
connection();

// middlewares
app.use(express.json());


app.get("/",(req,res) => {
    res.send("Coding with DIET");
})
// routes
app.use("/api/user", authRoutes);
app.use("/api/package", packageRoutes);
app.use("/api/community",communityRoutes);
app.use("/api/food",foodRoutes);
app.use("/api/profile",profileRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);


// app.use("/api/community", communityRoutes);



const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Server Listening at PORT - ${port}`);
});

const io = new Server.Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: '*',
    },
  });
  io.on('connection', (socket) => {
    socket.on('setup', (userData) => {
      socket.join(userData._id);
      socket.emit('connected');
    });
    socket.on('join room', (room) => {
      socket.join(room);
    });
    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));
  
    socket.on('new message', (newMessageRecieve) => {
      var chat = newMessageRecieve.chatId;
      if (!chat.users) console.log('chats.users is not defined');
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieve.sender._id) return;
        socket.in(user._id).emit('message recieved', newMessageRecieve);
      });
    });
  });