//SERVER
let state = {}; //{101: [0-11], 102 ...}
let statePress = []; //[i][j]

function loadStatePress() {

    for (let i = 0; i < 8; i++) {

        statePress[i] = [];

        for (let j = 0; j < 8; j++) {

            statePress[i][j] = 0;
        }
    }

    statePress[1][0] = 1;
}

loadStatePress();

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

    socket.emit('statePress', JSON.stringify(statePress));

    socket.emit('started', started);

    socket.on('up', (message) => up(socket, message));

    socket.on('down', (message) => down(socket, message));

    socket.on('siren', (message) => siren(socket, message));

    socket.on('win', (message) => win(socket, message));

    socket.on('start', (message) => start(socket, message));

    socket.on('stop', (message) => stop(socket, message));

    socket.on('press', (message) => press(socket, message));

    // socket.on('disconnect', () => removeUser(socket));
});

let started = false;

let tcpSocket1 = [];
let tcpSocket2 = [];
let tcpSocket3 = [];
let tcpSocket4 = [];

function up(socket, message) {

    // if (tcpSocket1 !== null) {
    //     tcpSocket1.write('U');
    // }
}

function down(socket, message) {

    // if (tcpSocket1 !== null) {
    //     tcpSocket1.write('D');
    // }
}

function siren(socket, message) {

    if (!started)
        return;

    // на сообщение Z я включаю сирену, на сообщение Х выключаю (на каждом девайсе)

    switch(message) {
        case 1:
            tcpSocket1.push('Z');
            tcpSocket1.push('Z');
            tcpSocket1.push('Z');
            setTimeout(function(){
                tcpSocket1.push('X');
                tcpSocket1.push('X');
                tcpSocket1.push('X');
            }, sirenTime);
            break;
        case 2:
            tcpSocket2.push('Z');
            tcpSocket2.push('Z');
            tcpSocket2.push('Z');
            setTimeout(function(){
                tcpSocket2.push('X');
                tcpSocket2.push('X');
                tcpSocket2.push('X');
            }, sirenTime);
            break;
        case 3:
            tcpSocket3.push('Z');
            tcpSocket3.push('Z');
            tcpSocket3.push('Z');
            setTimeout(function(){
                tcpSocket3.push('X');
                tcpSocket3.push('X');
                tcpSocket3.push('X');
            }, sirenTime);
            break;
        case 4:
            tcpSocket4.push('Z');
            tcpSocket4.push('Z');
            tcpSocket4.push('Z');
            setTimeout(function(){
                tcpSocket4.push('X');
                tcpSocket4.push('X');
                tcpSocket4.push('X');
                }, sirenTime);
            break;
        default:
            console.log("Siren error from " + message);
    }
}

exports.sirenPress = function (message) {

    if (!started)
        return;

    switch(message) {
        case 101:
            tcpSocket1.push('Z');
            // tcpSocket1.push('Z');
            // tcpSocket1.push('Z');
            setTimeout(function(){ tcpSocket1.push('X'); }, sirenTime);
            break;
        case 102:
            tcpSocket2.push('Z');
            // tcpSocket2.push('Z');
            // tcpSocket2.push('Z');
            setTimeout(function(){ tcpSocket2.push('X'); }, sirenTime);
            break;
        case 103:
            tcpSocket3.push('Z');
            // tcpSocket3.push('Z');
            // tcpSocket3.push('Z');
            setTimeout(function(){ tcpSocket3.push('X'); }, sirenTime);
            break;
        case 104:
            tcpSocket4.push('Z');
            // tcpSocket4.push('Z');
            // tcpSocket4.push('Z');
            setTimeout(function(){ tcpSocket4.push('X'); }, sirenTime);
            break;
        default:
            console.log("Siren error from " + message);
    }
};

function win(socket, message) {

    if (!started)
        return;

    // A B C D
    tcpSocket1.push(message);
    tcpSocket1.push(message);
    tcpSocket1.push(message);

    // на сообщения 1-4 зажигаю на 101й девайс зажигаю цветом команды 1-4 подсветку
}

function start(socket, message) {
    started = true;
    io.sockets.emit('start', '');
}

function stop(socket, message) {
    started = false;
    io.sockets.emit('stop', '');
}

function press(socket, message) {

    let data = message.split('|');

    console.log(data);

    statePress[data[0]][data[1]] = parseInt(data[2]);

    io.sockets.emit('statePress', JSON.stringify(statePress));
}

//TCP SOCKET
let net = require('net');

let roster = require('./roster.js');

let tcpServer = net.createServer(function(tcpSocket) {

    console.log('Connected');

    tcpSocket.pipe(tcpSocket);

    tcpSocket.on('data', function (data) {

        let array = JSON.parse(JSON.stringify(data))['data'];
        if (array.length >= 13) {

            // console.log(array);

            let side = array.shift();

            if (side === 91) {
                side = 101;
                array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            }

            if (side >= 100 && side <= 110) {

                state[side] = array.slice(0, 12);
                // console.log(state);

                io.sockets.emit('state', JSON.stringify(state));

                roster.checkState(state, statePress);

                if (tcpSocket1.length > 0 && side === 101) {
                    tcpSocket.write(tcpSocket1.shift());
                    return;
                }

                if (tcpSocket2.length > 0 && side === 102) {
                    tcpSocket.write(tcpSocket2.shift());
                    return;
                }

                if (tcpSocket3.length > 0 && side === 103) {
                    tcpSocket.write(tcpSocket3.shift());
                    return;
                }

                if (tcpSocket4.length > 0 && side === 104) {
                    tcpSocket.write(tcpSocket4.shift());
                    return;
                }
            }
        }

        tcpSocket.write('N');
    });

    tcpSocket.on('error', function (error) {
        console.log(error);
    });
});

tcpServer.listen(6060);