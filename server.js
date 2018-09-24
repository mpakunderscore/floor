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

    // на сообщение Z я включаю сирену, на сообщение Х выключаю (на каждом девайсе)

    switch(message) {
        case 1:
            tcpSocket1.push('Z');
            setTimeout(function(){ tcpSocket1.push('X'); }, sirenTime);
            break;
        case 2:
            tcpSocket2.push('Z');
            setTimeout(function(){ tcpSocket2.push('X'); }, sirenTime);
            break;
        case 3:
            tcpSocket3.push('Z');
            setTimeout(function(){ tcpSocket3.push('X'); }, sirenTime);
            break;
        case 4:
            tcpSocket4.push('Z');
            setTimeout(function(){ tcpSocket4.push('X'); }, sirenTime);
            break;
        default:
            console.log("Siren error from " + message);
    }
}

function win(socket, message) {

    // if (tcpSocket1 !== null) {
    //     tcpSocket1.write(message.toString());
    // }

    // A B C D
    tcpSocket1.push(message);

    // на сообщения 1-4 зажигаю на 101й девайс зажигаю цветом команды 1-4 подсветку
}

//TCP SOCKET
let net = require('net');

let tcpServer = net.createServer(function(tcpSocket) {

    console.log('Connected');

    tcpSocket.pipe(tcpSocket);

    tcpSocket.on('data', function (data) {

        let array = JSON.parse(JSON.stringify(data))['data'];
        if (array.length >= 13) {

            // console.log(array);

            let side = array.shift();

            if (side === 91) {
                side = 104;
                array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            }

            if (side >= 100 && side <= 110) {

                state[side] = array.slice(0, 12);
                // console.log(state);

                // if (side === 101)
                //     tcpSocket1 = tcpSocket;
                //
                // if (side === 102)
                //     tcpSocket2 = tcpSocket;
                //
                // if (side === 103)
                //     tcpSocket3 = tcpSocket;
                //
                // if (side === 104)
                //     tcpSocket4 = tcpSocket;

                io.sockets.emit('state', JSON.stringify(state));

                if (tcpSocket1.length > 0) {
                    tcpSocket.write(tcpSocket1.shift());
                    return;
                }


                if (tcpSocket2.length > 0) {
                    tcpSocket.write(tcpSocket2.shift());
                    return;
                }

                if (tcpSocket3.length > 0) {
                    tcpSocket.write(tcpSocket3.shift());
                    return;
                }

                if (tcpSocket4.length > 0) {
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