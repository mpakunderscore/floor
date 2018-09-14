//SERVER

let express = require('express');
let path = require('path');

let app = express();

//STATIC WEB
app.use(express.static(path.join(__dirname, 'web')));

let server = require('http').Server(app);

const port = process.env.PORT || 8080;

server.listen(port);


let net = require('net');

let state = {};

let tcpServer = net.createServer(function(socket) {

    console.log('Connected');

    socket.pipe(socket);

    socket.on('data', function (data) {

        let array = JSON.parse(JSON.stringify(data)).data;
        if (array.length >= 13) {

            let side = array.shift();

            if (side >= 100 && side <= 110) {
                state[side] = array.slice(0, 12);
                console.log(state);
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