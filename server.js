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

    socket.on('up', (message) => up(socket, message));

    socket.on('down', (message) => down(socket, message));

    socket.on('siren', (message) => siren(socket, message));

    socket.on('win', (message) => win(socket, message));

    // socket.on('disconnect', () => removeUser(socket));
});

function up(socket, message) {
    tcpSocketOne.write('U');
}

function down(socket, message) {
    tcpSocketOne.write('D');
}

function siren(socket, message) {

    // на сообщение Z я включаю сирену, на сообщение Х выключаю (на каждом девайсе)

    switch(message) {
        case 1:
            tcpSocket1.write('Z');
            break;
        case 2:
            tcpSocket2.write('Z');
            break;
        case 3:
            tcpSocket3.write('Z');
            break;
        case 4:
            tcpSocket4.write('Z');
            break;
        default:
            console.log("Siren error from " + message);
    }

    // TODO turn off after 10 sec
    // tcpSocketOne.write('X');
}

function win(socket, message) {

    switch(message) {
        case 1:
            tcpSocket1.write('Z');
            break;
        case 2:
            tcpSocket1.write('Z');
            break;
        case 3:
            tcpSocket1.write('Z');
            break;
        case 4:
            tcpSocket1.write('Z');
            break;
        default:
            console.log("Siren error from " + message);
    }
    // на сообщения 1-4 зажигаю на 101й девайс зажигаю цветом команды 1-4 подсветку
}

//TCP SOCKET
let net = require('net');

// setInterval(function(){
//
//     io.sockets.emit('state', JSON.stringify(state));
//
// }, 1000);

let tcpSocket1 = null;
let tcpSocket2 = null;
let tcpSocket3 = null;
let tcpSocket4 = null;

let tcpServer = net.createServer(function(tcpSocket) {

    console.log('Connected');

    tcpSocket.pipe(tcpSocket);

    tcpSocket.on('data', function (data) {

        let array = JSON.parse(JSON.stringify(data)).data;
        if (array.length >= 13) {

            let side = array.shift();

            if (side >= 100 && side <= 110) {

                state[side] = array.slice(0, 12);
                // console.log(state);

                if (side === 101)
                    tcpSocket1 = tcpSocket;

                if (side === 102)
                    tcpSocket1 = tcpSocket;

                if (side === 103)
                    tcpSocket1 = tcpSocket;

                if (side === 104)
                    tcpSocket1 = tcpSocket;

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



//CLIENT

// var client = new net.Socket();
// client.connect(6060, '127.0.0.1', function() {
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