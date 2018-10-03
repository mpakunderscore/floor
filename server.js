//SERVER
let state = {}; //{101: [0-11], 102 ...}
let statePress = []; //[i][j]

const Store = require('data-store');
const store = new Store({ path: 'config.json' });

function loadStatePress() {

    if (store.get('state') === undefined) {

        for (let i = 0; i < 8; i++) {
            statePress[i] = [];
            for (let j = 0; j < 8; j++) {
                statePress[i][j] = 0;
            }
        }

        store.set('state', statePress);
    }

    statePress = store.get('state');
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

    socket.on('sirenx', (message) => sirenStop(socket, message));

    socket.on('win', (message) => win(socket, message));

    socket.on('white', (message) => white(socket, message));

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
        case 101:
            tcpSocket1.push('Z');
            tcpSocket1.push('Z');
            tcpSocket1.push('Z');
            setTimeout(function(){
                tcpSocket1.push('X');
                tcpSocket1.push('X');
                tcpSocket1.push('X');
            }, sirenTime);
            break;
        case 102:
            tcpSocket2.push('Z');
            tcpSocket2.push('Z');
            tcpSocket2.push('Z');
            setTimeout(function(){
                tcpSocket2.push('X');
                tcpSocket2.push('X');
                tcpSocket2.push('X');
            }, sirenTime);
            break;
        case 103:
            tcpSocket3.push('Z');
            tcpSocket3.push('Z');
            tcpSocket3.push('Z');
            setTimeout(function(){
                tcpSocket3.push('X');
                tcpSocket3.push('X');
                tcpSocket3.push('X');
            }, sirenTime);
            break;
        case 104:
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

function sirenStop(socket, message) {

    if (!started)
        return;

    // на сообщение Z я включаю сирену, на сообщение Х выключаю (на каждом девайсе)

    switch(message) {
        case 101:
            tcpSocket1.push('X');
            break;
        case 102:
            tcpSocket2.push('X');
            break;
        case 103:
            tcpSocket3.push('X');
            break;
        case 104:
            tcpSocket4.push('X');
            break;
        default:
            console.log("Siren error from " + message);
    }
}

let siren1 = false;
let siren2 = false;
let siren3 = false;
let siren4 = false;


exports.sirenPress = function (message) {

    if (!started)
        return;

    switch(message) {
        case 101:
            if (!siren1) {
                siren1 = true;
                tcpSocket1.push('Z');
                tcpSocket1.push('Z');
                tcpSocket1.push('Z');
                setTimeout(function(){
                    tcpSocket1.push('X');
                    tcpSocket1.push('X');
                    tcpSocket1.push('X');
                    siren1 = false;
                }, sirenTime);
            }
            break;
        case 102:
            if (!siren2) {
                siren2 = true;
                tcpSocket2.push('Z');
                tcpSocket2.push('Z');
                tcpSocket2.push('Z');
                setTimeout(function(){
                    tcpSocket2.push('X');
                    tcpSocket2.push('X');
                    tcpSocket2.push('X');
                    siren2 = false;
                }, sirenTime);
            }
            break;
        case 103:
            if (!siren3) {
                siren3 = true;
                tcpSocket3.push('Z');
                tcpSocket3.push('Z');
                tcpSocket3.push('Z');
                setTimeout(function(){
                    tcpSocket3.push('X');
                    tcpSocket3.push('X');
                    tcpSocket3.push('X');
                    siren3 = false;
                }, sirenTime);
            }
            break;
        case 104:
            if (!siren4) {
                siren4 = true;
                tcpSocket4.push('Z');
                tcpSocket4.push('Z');
                tcpSocket4.push('Z');
                setTimeout(function(){
                    tcpSocket4.push('X');
                    tcpSocket4.push('X');
                    tcpSocket4.push('X');
                    siren4 = false;
                }, sirenTime);
            }
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

    stop(null, null);

    setTimeout(function(){tcpSocket1.push('E');}, 10000);
}

exports.winPress = function (message) {

    if (!started)
        return;

    // A B C D
    tcpSocket1.push(message);
    tcpSocket1.push(message);
    tcpSocket1.push(message);

    // на сообщения 1-4 зажигаю на 101й девайс зажигаю цветом команды 1-4 подсветку

    stop(null, null);

    setTimeout(function(){tcpSocket1.push('E');}, 10000);
};

function white(socket, message) {
    tcpSocket1.push('E');
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

    store.set('state', statePress);

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

            // if (side === 91) {
            //     side = 101;
            //     array = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
            // }

            if (side >= 100 && side <= 110) {

                array = array.slice(0, 12);

                for (let i = 0; i < array.length; i++) {
                    if (array[i] === 0)
                        array[i] = 1;
                    else if (array[i] === 1)
                        array[i] = 0;
                }

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

        // tcpSocket.write('N');
    });

    tcpSocket.on('error', function (error) {
        console.log(error);
    });
});

tcpServer.listen(6060);