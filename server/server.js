const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var {generateMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	//socket.emit from admin text "welcome to chat app"
	socket.emit('newMessage', generateMessage("Admin", "Welcome to the Chat App!"));

	
	// socket.broadcast.emit from admin text new user joined
	socket.broadcast.emit('newMessage', generateMessage("Admin", "New user has joined"));
	
	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
	
	socket.on('createMessage', (message) => {
		console.log('message created: ', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		
		/* socket.broadcast.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		}); */
	});
});

server.listen(port, () => {
	console.log('server running on port ' + port);
});