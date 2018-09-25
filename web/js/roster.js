//Dear God, forgive me for this code

function setState(state) {

    console.log(state);

    reset();

    if (state[101] && state[101][0] === 1) signal(0, 1);
    if (state[101] && state[101][1] === 1) signal(0, 2);
    if (state[101] && state[101][2] === 1) signal(0, 3);
    if (state[101] && state[101][3] === 1) signal(0, 4);
    if (state[101] && state[101][4] === 1) signal(0, 5);
    if (state[101] && state[101][5] === 1) signal(0, 6);
    if (state[101] && state[101][6] === 1) signal(1, 2);
    if (state[101] && state[101][7] === 1) signal(1, 3);
    if (state[101] && state[101][8] === 1) signal(1, 4);
    if (state[101] && state[101][9] === 1) signal(1, 5);
    if (state[101] && state[101][10] === 1) signal(2, 3);
    if (state[101] && state[101][11] === 1) signal(2, 4);

    if (state[102] && state[102][0] === 1) signal(1, 7);
    if (state[102] && state[102][1] === 1) signal(2, 7);
    if (state[102] && state[102][2] === 1) signal(3, 7);
    if (state[102] && state[102][3] === 1) signal(4, 7);
    if (state[102] && state[102][4] === 1) signal(5, 7);
    if (state[102] && state[102][5] === 1) signal(6, 7);
    if (state[102] && state[102][6] === 1) signal(2, 6);
    if (state[102] && state[102][7] === 1) signal(3, 6);
    if (state[102] && state[102][8] === 1) signal(4, 6);
    if (state[102] && state[102][9] === 1) signal(5, 6);
    if (state[102] && state[102][10] === 1) signal(3, 5);
    if (state[102] && state[102][11] === 1) signal(4, 5);

    if (state[103] && state[103][0] === 1) signal(7, 6);
    if (state[103] && state[103][1] === 1) signal(7, 5);
    if (state[103] && state[103][2] === 1) signal(7, 4);
    if (state[103] && state[103][3] === 1) signal(7, 3);
    if (state[103] && state[103][4] === 1) signal(7, 2);
    if (state[103] && state[103][5] === 1) signal(7, 1);
    if (state[103] && state[103][6] === 1) signal(6, 5);
    if (state[103] && state[103][7] === 1) signal(6, 4);
    if (state[103] && state[103][8] === 1) signal(6, 3);
    if (state[103] && state[103][9] === 1) signal(6, 2);
    if (state[103] && state[103][10] === 1) signal(5, 4);
    if (state[103] && state[103][11] === 1) signal(5, 3);

    if (state[104] && state[104][0] === 1) signal(6, 0);
    if (state[104] && state[104][1] === 1) signal(5, 0);
    if (state[104] && state[104][2] === 1) signal(4, 0);
    if (state[104] && state[104][3] === 1) signal(3, 0);
    if (state[104] && state[104][4] === 1) signal(2, 0);
    if (state[104] && state[104][5] === 1) signal(1, 0);
    if (state[104] && state[104][6] === 1) signal(5, 1);
    if (state[104] && state[104][7] === 1) signal(4, 1);
    if (state[104] && state[104][8] === 1) signal(3, 1);
    if (state[104] && state[104][9] === 1) signal(2, 1);
    if (state[104] && state[104][10] === 1) signal(4, 2);
    if (state[104] && state[104][11] === 1) signal(3, 2);

    // check();
}

function setStatePress(state) {

    console.log(state);

    htmlMap();

    for (let i = 0; i < 8; i++) {

        for (let j = 0; j < 8; j++) {

            if (state[i][j] === 1) {

                $("#cell" + i + j).addClass("check");
            }
        }
    }
}