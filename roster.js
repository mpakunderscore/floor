let server = require('./server.js');

let win = false;

exports.checkState = function (state, statePressed) {

    // console.log(state);
    // console.log(statePressed);

    win = true;

    if (state[101] && state[101][0] === 1 && statePressed[0][1] === 1) signal(101, 0);

    if (state[101] && state[101][0] === 0 && statePressed[0][1] === 0) win = false;

    if (state[101] && state[101][1] === 1 && statePressed[0][2] === 1) signal(101, 1);

    if (state[101] && state[101][1] === 0 && statePressed[0][2] === 0) win = false;

    if (state[101] && state[101][2] === 1 && statePressed[0][3] === 1) signal(101, 2);

    if (state[101] && state[101][2] === 0 && statePressed[0][3] === 0) win = false;

    if (state[101] && state[101][3] === 1 && statePressed[0][4] === 1) signal(101, 3);

    if (state[101] && state[101][3] === 0 && statePressed[0][4] === 0) win = false;

    if (state[101] && state[101][4] === 1 && statePressed[0][5] === 1) signal(101, 4);

    if (state[101] && state[101][4] === 0 && statePressed[0][5] === 0) win = false;

    if (state[101] && state[101][5] === 1 && statePressed[0][6] === 1) signal(101, 5);

    if (state[101] && state[101][5] === 0 && statePressed[0][6] === 0) win = false;

    if (state[101] && state[101][6] === 1 && statePressed[1][2] === 1) signal(101, 6);

    if (state[101] && state[101][6] === 0 && statePressed[1][2] === 0) win = false;

    if (state[101] && state[101][7] === 1 && statePressed[1][3] === 1) signal(101, 7);

    if (state[101] && state[101][7] === 0 && statePressed[1][3] === 0) win = false;

    if (state[101] && state[101][8] === 1 && statePressed[1][4] === 1) signal(101, 8);

    if (state[101] && state[101][8] === 0 && statePressed[1][4] === 0) win = false;

    if (state[101] && state[101][9] === 1 && statePressed[1][5] === 1) signal(101, 9);

    if (state[101] && state[101][9] === 0 && statePressed[1][5] === 0) win = false;

    if (state[101] && state[101][10] === 1 && statePressed[2][3] === 1) signal(101, 10);

    if (state[101] && state[101][10] === 0 && statePressed[2][3] === 0) win = false;

    if (state[101] && state[101][11] === 1 && statePressed[2][4] === 1) signal(101, 11);

    if (state[101] && state[101][11] === 0 && statePressed[2][4] === 0) win = false;

    if (win) {
        server.winPress('A');
        return;
    }

    win = true;

    if (state[102] && state[102][0] === 1 && statePressed[1][7] === 1) signal(102, 0);

    if (state[102] && state[102][0] === 0 && statePressed[1][7] === 0) win = false;

    if (state[102] && state[102][1] === 1 && statePressed[2][7] === 1) signal(102, 1);

    if (state[102] && state[102][1] === 0 && statePressed[2][7] === 0) win = false;

    if (state[102] && state[102][2] === 1 && statePressed[3][7] === 1) signal(102, 2);

    if (state[102] && state[102][2] === 0 && statePressed[3][7] === 0) win = false;

    if (state[102] && state[102][3] === 1 && statePressed[4][7] === 1) signal(102, 3);

    if (state[102] && state[102][3] === 0 && statePressed[4][7] === 0) win = false;

    if (state[102] && state[102][4] === 1 && statePressed[5][7] === 1) signal(102, 4);

    if (state[102] && state[102][4] === 0 && statePressed[5][7] === 0) win = false;

    if (state[102] && state[102][5] === 1 && statePressed[6][7] === 1) signal(102, 5);

    if (state[102] && state[102][5] === 0 && statePressed[6][7] === 0) win = false;

    if (state[102] && state[102][6] === 1 && statePressed[2][6] === 1) signal(102, 6);

    if (state[102] && state[102][6] === 0 && statePressed[2][6] === 0) win = false;

    if (state[102] && state[102][7] === 1 && statePressed[3][6] === 1) signal(102, 7);

    if (state[102] && state[102][7] === 0 && statePressed[3][6] === 0) win = false;

    if (state[102] && state[102][8] === 1 && statePressed[4][6] === 1) signal(102, 8);

    if (state[102] && state[102][8] === 0 && statePressed[4][6] === 0) win = false;

    if (state[102] && state[102][9] === 1 && statePressed[5][6] === 1) signal(102, 9);

    if (state[102] && state[102][9] === 0 && statePressed[5][6] === 0) win = false;

    if (state[102] && state[102][10] === 1 && statePressed[3][5] === 1) signal(102, 10);

    if (state[102] && state[102][10] === 0 && statePressed[3][5] === 0) win = false;

    if (state[102] && state[102][11] === 1 && statePressed[4][5] === 1) signal(102, 11);

    if (state[102] && state[102][11] === 0 && statePressed[4][5] === 0) win = false;

    if (win) {
        server.winPress('B');
        return;
    }

    win = true;

    if (state[103] && state[103][0] === 1 && statePressed[7][6] === 1) signal(103, 0);

    if (state[103] && state[103][0] === 0 && statePressed[7][6] === 0) win = false;

    if (state[103] && state[103][1] === 1 && statePressed[7][5] === 1) signal(103, 1);

    if (state[103] && state[103][1] === 0 && statePressed[7][5] === 0) win = false;

    if (state[103] && state[103][2] === 1 && statePressed[7][4] === 1) signal(103, 2);

    if (state[103] && state[103][2] === 0 && statePressed[7][4] === 0) win = false;

    if (state[103] && state[103][3] === 1 && statePressed[7][3] === 1) signal(103, 3);

    if (state[103] && state[103][3] === 0 && statePressed[7][3] === 0) win = false;

    if (state[103] && state[103][4] === 1 && statePressed[7][2] === 1) signal(103, 4);

    if (state[103] && state[103][4] === 0 && statePressed[7][2] === 0) win = false;

    if (state[103] && state[103][5] === 1 && statePressed[7][1] === 1) signal(103, 5);

    if (state[103] && state[103][5] === 0 && statePressed[7][1] === 0) win = false;

    if (state[103] && state[103][6] === 1 && statePressed[6][5] === 1) signal(103, 6);

    if (state[103] && state[103][6] === 0 && statePressed[6][5] === 0) win = false;

    if (state[103] && state[103][7] === 1 && statePressed[6][4] === 1) signal(103, 7);

    if (state[103] && state[103][7] === 0 && statePressed[6][4] === 0) win = false;

    if (state[103] && state[103][8] === 1 && statePressed[6][3] === 1) signal(103, 8);

    if (state[103] && state[103][8] === 0 && statePressed[6][3] === 0) win = false;

    if (state[103] && state[103][9] === 1 && statePressed[6][2] === 1) signal(103, 9);

    if (state[103] && state[103][9] === 0 && statePressed[6][2] === 0) win = false;

    if (state[103] && state[103][10] === 1 && statePressed[5][4] === 1) signal(103, 10);

    if (state[103] && state[103][10] === 0 && statePressed[5][4] === 0) win = false;

    if (state[103] && state[103][11] === 1 && statePressed[5][3] === 1) signal(103, 11);

    if (state[103] && state[103][11] === 0 && statePressed[5][3] === 0) win = false;

    if (win) {
        server.winPress('C');
        return;
    }

    win = true;

    if (state[104] && state[104][0] === 1 && statePressed[6][0] === 1) signal(104, 0);

    if (state[104] && state[104][0] === 0 && statePressed[6][0] === 0) win = false;

    if (state[104] && state[104][1] === 1 && statePressed[5][0] === 1) signal(104, 1);

    if (state[104] && state[104][1] === 0 && statePressed[5][0] === 0) win = false;

    if (state[104] && state[104][2] === 1 && statePressed[4][0] === 1) signal(104, 2);

    if (state[104] && state[104][2] === 0 && statePressed[4][0] === 0) win = false;

    if (state[104] && state[104][3] === 1 && statePressed[3][0] === 1) signal(104, 3);

    if (state[104] && state[104][3] === 0 && statePressed[3][0] === 0) win = false;

    if (state[104] && state[104][4] === 1 && statePressed[2][0] === 1) signal(104, 4);

    if (state[104] && state[104][4] === 0 && statePressed[2][0] === 0) win = false;

    if (state[104] && state[104][5] === 1 && statePressed[1][0] === 1) signal(104, 5);

    if (state[104] && state[104][5] === 0 && statePressed[1][0] === 0) win = false;

    if (state[104] && state[104][6] === 1 && statePressed[5][1] === 1) signal(104, 6);

    if (state[104] && state[104][6] === 0 && statePressed[5][1] === 0) win = false;

    if (state[104] && state[104][7] === 1 && statePressed[4][1] === 1) signal(104, 7);

    if (state[104] && state[104][7] === 0 && statePressed[4][1] === 0) win = false;

    if (state[104] && state[104][8] === 1 && statePressed[3][1] === 1) signal(104, 8);

    if (state[104] && state[104][8] === 0 && statePressed[3][1] === 0) win = false;

    if (state[104] && state[104][9] === 1 && statePressed[2][1] === 1) signal(104, 9);

    if (state[104] && state[104][9] === 0 && statePressed[2][1] === 0) win = false;

    if (state[104] && state[104][10] === 1 && statePressed[4][2] === 1) signal(104, 10);

    if (state[104] && state[104][10] === 0 && statePressed[4][2] === 0) win = false;

    if (state[104] && state[104][11] === 1 && statePressed[3][2] === 1) signal(104, 11);

    if (state[104] && state[104][11] === 0 && statePressed[3][2] === 0) win = false;

    if (win) {
        server.winPress('D');
    }
};

function signal(i, j) {

    win = false;
    server.sirenPress(i);
}