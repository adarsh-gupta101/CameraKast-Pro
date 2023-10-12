const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve static files (HTML, etc.)

io.on('connection', (socket) => {
  console.log('A user connected.');

  socket.on('offer', (offer) => {
    // Handle the offer, create an answer, and send it back
    socket.broadcast.emit('answer', answer);
  });

  socket.on('ice-candidate', (iceCandidate) => {
    // Handle the ICE candidate and send it to the other party
    socket.broadcast.emit('ice-candidate', iceCandidate);
  });

  socket.on('videoFrame', (videoFrameData) => {
    // Handle the incoming video frame data
    // Here, you can broadcast it to all connected clients or perform any other desired action
    console.log(videoFrameData)
    socket.broadcast.emit('receivedVideoFrame', videoFrameData);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
