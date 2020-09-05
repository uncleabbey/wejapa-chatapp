const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { getUser, joinUser, userLeaves, getUsers } = require("./utils/users")

const server = http.createServer(app)

const io = socketio(server);
const chatbot = "ChatBot"

io.on("connection", (socket) => {
  
  socket.on("addUser", (username) => {
    const user = joinUser(socket.id, username);
    
    socket.emit("message", formatMessage(chatbot, "Welcome to our ChatApp"))
  
    socket.broadcast.emit("message", formatMessage(chatbot, `${username} joined the chat`))

    io.emit("users", {
      users: getUsers()
    })
  })


  socket.on("chatMessage", (msg) => {
    const user = getUser(socket.id);
    io.emit("message", formatMessage(user.username, msg))
  })

  socket.on("disconnect", () => {
    const user = userLeaves(socket.id)

    if(user) {
      io.emit("message", formatMessage(chatbot, `${user.username} has has left the chat`))
  
      io.emit("users", {
        users: getUsers()
      })
    }
  })
});
app.use(express.static(path.join(__dirname, "public")))

const port = process.env.PORT || 3000

server.listen(port, () => console.log(`Server is Listening on port:${port}`))