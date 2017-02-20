const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage, generateLocationMessage} = require('./utils/message');
var {isRealString} = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);



app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	
	
	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)){
			callback('Please enter valid name and room name');
		}
		
		socket.join(params.room);
		// socket.leave(params.room)
		
		// io.to(params.room).emit
		// socket.broadcast.to(params.room).emit
		// socket.emit 
		
		socket.emit('newMessage', generateMessage("Admin", "Welcome to the Chat App!"));

		socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", `${params.name} has joined`));
		
		callback();
	});
	
	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
	
	socket.on('createMessage', (message, callback) => {
		console.log('message created: ', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('This is from the server');
	});
	
	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});
	
});

server.listen(port, () => {
	console.log('server running on port ' + port);
});