const express = require('express');
const socketIo = require('socket.io')(80);
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketIo.listen(server);

const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;
const parser = new ReadLine();
const mySerial = new SerialPort('COM4',{
	baudRate:9600
});
mySerial.pipe(parser);

app.get('/',(req, res, next) => {
	res.sendFile(__dirname + '/index.html');
});




mySerial.on('open', function (){
	console.log('Port => Open');
	
});

parser.on('data', function(data) {
    //console.log(data.toString());
	io.emit('arduino:data',{
		value: data.toString()
	});
});

server.listen(3000,() => {
	console.log('server on port *:', 3000);
});