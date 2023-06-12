// Establish a connection with the server
const socket = io();

// Select elements
const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Event listener for send button
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message !== '') {
        sendMessage(message);
        messageInput.value = '';
    }
});

// Function to display a new message
function displayMessage(message) {
    const newMessage = document.createElement('div');
    newMessage.innerText = message;
    messageContainer.appendChild(newMessage);
}

// Function to send a message to the server
function sendMessage(message) {
    socket.emit('chat message', message);
}

// Listen for new messages from the server
socket.on('chat message', (message) => {
    displayMessage(message);
});
