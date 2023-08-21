const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

const users = [];
const chatMessages = [];

io.on('connection', (socket) => {
  console.log('user connected');
  socket.emit('chatMessagesFromServer', chatMessages);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('customeEventFromClient', (payload) => {
    console.log('customeEventFromClient ', payload);
    socket.emit('customeEventFromServer', 'payload from server');
  });
  socket.on('signInEventFromClient', (payload) => {
    users.push({ username: payload });
    console.log(users);
  });
  socket.on('chatEventFromClient', (payload) => {
    chatMessages.push(payload);
    io.emit('chatMessagesFromServer', chatMessages);
  });
});

httpServer.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});
