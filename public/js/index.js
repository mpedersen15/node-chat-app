var socket = io();

socket.on('connect', function(){
	console.log('Connected to server');
	
	socket.emit('createMessage', {
		from: 'Matt',
		text: 'Heck yeah I wanna watch Star Wars'
	})
});

socket.on('disconnect', function(){
	console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
	console.log('Message', message);
});