const port = 8080;
const ip = 'localhost:' + port;

let socket = io(window.location.hostname, {secure: false});
// let socket = io(window.location.hostname, {secure: true});

// socket.on('connect', function(){});
// socket.on('event', function(data){});
// socket.on('disconnect', function(){});

// export let sendSound = function () {
//     socket.emit('sound', 'some sound');
// };

// export let sendLocation = function (region) {
//     socket.emit('location', JSON.stringify(region));
// };

function down() {

    socket.emit('down', '');
}


socket.on('state', (state) => {

    console.log(JSON.parse(state));

    set(JSON.parse(state))

    // console.log(JSON.parse(duck));

    // map.npc.push(JSON.parse(duck));

    // setUser();
});

function set(state) {

    reset();

    // for (let i = 0; i < 8; i++) {
    //
    //     for (let j = 0; j < 8; j++) {
    //
    //         if (i === j || i === 7 - j) {
    //             continue;
    //         }
    //
    //         if (Math.random() > 0.9)
    //             signal(i, j);
    //     }
    // }

    check();
}