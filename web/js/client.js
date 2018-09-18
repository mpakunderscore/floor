let socket = io();

function down() {
    socket.emit('down', '');
}

function up() {
    socket.emit('up', '');
}

function siren(id) {
    socket.emit('siren', id);
    // на сообщение Z я включаю сирену, на сообщение Х выключаю (на каждом девайсе)
}

function win(id) {
    socket.emit('win', id);
    // на сообщения 1-4 зажигаю на 101й девайс зажигаю цветом команды 1-4 подсветку
}

socket.on('state', (state) => {

    console.log(JSON.parse(state));
    set(JSON.parse(state))
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