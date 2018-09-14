//SERVER
let state = {0: [0, 0]};

//HTTP
let express = require('express');
let path = require('path');
let app = express();
app.use(express.static(path.join(__dirname, 'web')));

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

let tcpServer = net.createServer(function(socket) {

    console.log('Connected');

    socket.pipe(socket);

    socket.on('data', function (data) {

        let array = JSON.parse(JSON.stringify(data)).data;
        if (array.length >= 13) {

            let side = array.shift();

            if (side >= 100 && side <= 110) {
                state[side] = array.slice(0, 12);
                // console.log(state);
                io.sockets.emit('state', JSON.stringify(state));
            }
        }

        socket.write('A');
    });

    socket.on('error', function (error) {
        console.log(error);
    });

    socket.write('Echo server');
});

tcpServer.listen(6060);