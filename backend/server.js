const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route for serving the chat application page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for new messages
    socket.on('chat message', (message) => {
        console.log('Received message:', message);
        io.emit('chat message', message); // Broadcast the message to all connected clients
    });

    // Listen for disconnections
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const port = 3000;
http.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
