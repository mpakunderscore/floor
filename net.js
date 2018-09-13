let net = require('net');

let server = net.createServer(function(socket) {

    console.log('Connected');
    socket.pipe(socket);
    socket.on('data', function (data) {
        console.log(JSON.stringify(data));
        socket.write('A');
    });
    socket.on('error', function (error) {
        console.log(error);
    });

    socket.write('Echo server');
});

server.listen(6060, '192.168.0.164');


// let client = new net.Socket();
// client.connect(1337, '127.0.0.1', function() {
//     console.log('Connected');
//     client.write('Hello, server! Love, Client.');
// });
//
// client.on('data', function(data) {
//     console.log('Received: ' + data);
//     client.destroy(); // kill client after server's response
// });
//
// client.on('close', function() {
//     console.log('Connection closed');
// });