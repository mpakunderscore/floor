//SERVER
let state = {};
state[111] = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1];

//HTTP
let express = require('express');
let path = require('path');
let app = express();
app.use(express.static(path.join(__dirname, 'web')));
app.use('/siren', express.static(path.join(__dirname, 'web/siren.html')));

let server = require('http').Server(app);
const port = process.env.PORT || 8080;

//WEB SOCKET
let io = require('socket.io')(server);

server.listen(port, () => console.log('socket listening on: ' + port));

io.on('connection', (socket) => {

    console.log('connect: ' + socket.id);

    // console.log(map);

    socket.emit('state', JSON.stringify(state));
    //
    // socket.on('sound', (message) => receiveSound(socket, message));

    // socket.on('disconnect', () => removeUser(socket));
});

//TCP SOCKET
let net = require('net');

setInterval(function(){

    io.sockets.emit('state', JSON.stringify(state));

}, 1000);

let tcpServer = net.createServer(function(tcpSocket) {

    console.log('Connected');

    tcpSocket.pipe(tcpSocket);

    tcpSocket.on('data', function (data) {

        let array = JSON.parse(JSON.stringify(data)).data;
        if (array.length >= 13) {

            let side = array.shift();

            if (side >= 100 && side <= 110) {

                state[side] = array.slice(0, 12);
                console.log(state);

                io.sockets.emit('state', JSON.stringify(state));
            }
        }

        // tcpSocket.write('A');
    });

    tcpSocket.on('error', function (error) {
        console.log(error);
    });

    // tcpSocket.write('Echo server');
});

tcpServer.listen(6060);