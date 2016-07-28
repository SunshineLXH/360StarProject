var net = require('net');

var serverIP = '127.0.0.1';
var serverPort = 9090;

net.createServer(function(sock) {
	sock.on('data', function(data) {
    	console.log('receive data from client: ' + data);
		sock.write('HTTP/1.1 200 OK\r\n');
		sock.write('Content-Type: text/plain; charset=utf-8\r\n');
		sock.write('Content-Length: 10\r\n');
		sock.write('\r\n');
		sock.write('0123456789');
		//sock.destroy();
	});
}).listen(serverPort, serverIP);

console.log('HTTP Server is running on ' + serverIP + ':' + serverPort);