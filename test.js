
let net = require('net');

// CLIENT

let state = [101, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1];


let client = new net.Socket();

client.connect(6060, '127.0.0.1', function() {

    console.log('Connected');

    setInterval(function(){

        try {

            client.write(JSON.stringify(state));

        } catch (e) {

        }

    }, 1000);
});

client.on('data', function(data) {

    console.log('Received: ' + data);
    // client.destroy(); // kill client after server's response
});

client.on('close', function() {

    console.log('Connection closed');
});