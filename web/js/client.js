let socket = io();

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