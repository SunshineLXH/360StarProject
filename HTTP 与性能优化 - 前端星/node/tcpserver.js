var net = require('net');

var serverIP = '127.0.0.1';
var serverPort = 9090;

net.createServer(function(sock) {
    sock.on('data', function(data) {
    	console.log('receive data from client: ' + data);
        sock.write(data);
    });
}).listen(serverPort, serverIP);

console.log('TCP Server is running on ' + serverIP + ':' + serverPort);