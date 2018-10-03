let socket = io();

function down() {
    socket.emit('down', '');
}

function up() {
    socket.emit('up', '');
}

function siren(id) {
    console.log('siren: ' + id)
    socket.emit('siren', id);
    // на сообщение Z я включаю сирену, на сообщение Х выключаю (на каждом девайсе)
}

function sirenx(id) {
    console.log('sirenx: ' + id)
    socket.emit('sirenx', id);
    // на сообщение Z я включаю сирену, на сообщение Х выключаю (на каждом девайсе)
}

function win(id) {
    socket.emit('win', id);
    // на сообщения 1-4 зажигаю на 101й девайс зажигаю цветом команды 1-4 подсветку
}

function start() {
    socket.emit('start', '');
}

function stop() {
    socket.emit('stop', '');
}

function pressSend(i, j, pressed) {
    socket.emit('press', i + '|' + j + '|' + pressed);
}

socket.on('state', (state) => {
    setState(JSON.parse(state))
});

socket.on('statePress', (state) => {
    setStatePress(JSON.parse(state))
});

socket.on('start', (state) => {
    $('#start').addClass('disabled');
    $('#stop').removeClass('disabled');
});

socket.on('stop', (state) => {
    $('#start').removeClass('disabled');
    $('#stop').addClass('disabled');
});

socket.on('started', (started) => {
    if (started) {
        $('#start').addClass('disabled');
        $('#stop').removeClass('disabled');
    } else {
        $('#start').removeClass('disabled');
        $('#stop').addClass('disabled');
    }
});