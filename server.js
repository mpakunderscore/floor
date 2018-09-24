//SERVER
let state = {};

let sirenTime = 10000;
let sirenOn = false;

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

    if (tcpSocket1 !== null) {
        tcpSocket1.write('U');
    }
}

function down(socket, message) {

    if (tcpSocket1 !== null) {
        tcpSocket1.write('D');
    }
}

function siren(socket, message) {

    // на сообщение Z я включаю сирену, на сообщение Х выключаю (на каждом девайсе)

    switch(message) {
        case 1:
            if (tcpSocket1 !== null) {
                tcpSocket1.write('Z');
                setTimeout(function(){ tcpSocket1.write('X'); }, sirenTime);
            }
            break;
        case 2:
            if (tcpSocket2 !== null) {
                tcpSocket2.write('Z');
                setTimeout(function(){ tcpSocket2.write('X'); }, sirenTime);
            }
            break;
        case 3:
            if (tcpSocket3 !== null) {
                tcpSocket3.write('Z');
                setTimeout(function(){ tcpSocket3.write('X'); }, sirenTime);
            }
            break;
        case 4:
            if (tcpSocket3 !== null) {
                tcpSocket3.write('Z');
                setTimeout(function(){ tcpSocket3.write('X'); }, sirenTime);
            }
            break;
        default:
            console.log("Siren error from " + message);
    }
}

function win(socket, message) {

    if (tcpSocket1 !== null) {
        tcpSocket1.write(message.toString());
    }

    // на сообщения 1-4 зажигаю на 101й девайс зажигаю цветом команды 1-4 подсветку
}

//TCP SOCKET
let net = require('net');

let tcpSocket1 = null;
let tcpSocket2 = null;
let tcpSocket3 = null;
let tcpSocket4 = null;

let tcpServer = net.createServer(function(tcpSocket) {

    console.log('Connected');

    tcpSocket.pipe(tcpSocket);

    tcpSocket.on('data', function (data) {

        let array = JSON.parse(JSON.stringify(data))['data'];
        if (array.length >= 13) {

            console.log(array);

            let side = array.shift();

            if (side === 91) {
                side = 104;
                array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            }

            if (side >= 100 && side <= 110) {

                state[side] = array.slice(0, 12);
                // console.log(state);

                if (side === 101)
                    tcpSocket1 = tcpSocket;

                if (side === 102)
                    tcpSocket2 = tcpSocket;

                if (side === 103)
                    tcpSocket3 = tcpSocket;

                if (side === 104)
                    tcpSocket4 = tcpSocket;

                io.sockets.emit('state', JSON.stringify(state));
            }
        }
        });

    tcpSocket.on('error', function (error) {
        console.log(error);
    });
});

tcpServer.listen(6060);