exports.checkState = function (state) {

    console.log(state);

    for (let i = 101; i < 105; i++) {

        if (state[i]) {

            for (let j = 0; j < 12; j++) {

                if (state[i][j] && state[i][j] === 1) {

                    signal(i)
                }
            }
        }
    }
};

function signal(j) {
    // console.log(j)
}