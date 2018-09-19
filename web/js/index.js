// window.$ = window.jQuery = module.exports;

let map = [];
let state = [];

function htmlMap() {

    $("#floor").html("");

    for (let i = 0; i < 8; i++) {

        $("#floor").append("<div class='rowCell' id='row" + i + "'></div>");

        let row = [];
        let row2 = [];

        for (let j = 0; j < 8; j++) {

            row.push(0);
            row2.push(0);

            $("#row" + i).append("<div class='cell' id='cell" + i + j + "' onclick='press(" + i + " ," + j + ")'></div>");

            if (i === j || i === 7 - j) {

                $("#cell" + i + j).addClass("none");
                continue;
            }

            $("#cell" + i + j).append("<div class='signal' id='signal" + i + j + "'></div>");
        }

        map.push(row);
        state.push(row2);
    }
}

htmlMap();

function loadMap(newMap) {

    htmlMap();

    for (let i = 0; i < 8; i++) {

        for (let j = 0; j < 8; j++) {

            if (newMap[i][j] === 1) {

                map[i][j] = 1;
                $("#cell" + i + j).addClass("check");
            }
        }
    }
}

function press(i, j) {

    console.log(i + " " + j);

    if (map[i][j] === 1) {

        map[i][j] = 0;
        $("#cell" + i + j).removeClass("check");

    } else {

        map[i][j] = 1;
        $("#cell" + i + j).addClass("check");
    }
}


function save() {

    console.log("save");

    localStorage.setItem("first", JSON.stringify(map));
}

function load() {

    let newMap = JSON.parse(localStorage.getItem("first"));

    console.log("load");
    console.log(newMap);

    if (newMap)
        loadMap(newMap);
}

function test() {

    reset();

    for (let i = 0; i < 8; i++) {

        for (let j = 0; j < 8; j++) {

            if (i === j || i === 7 - j) {
                continue;
            }

            if (Math.random() > 0.9)
                signal(i, j);
        }
    }

    check();
}

function signal(i, j) {

    state[i][j] = 1;
    $("#signal" + i + j).addClass("red");
}

function reset() {

    for (let i = 0; i < 8; i++) {

        for (let j = 0; j < 8; j++) {

            if (i === j || i === 7 - j) {
                continue;
            }

            state[i][j] = 0;
            $("#signal" + i + j).removeClass("red");
        }
    }
}

function check() {

    // console.log("check")

    let wrong = 0;
    let correct = 0;

    for (let i = 0; i < 8; i++) {

        for (let j = 0; j < 8; j++) {

            if (i === j || i === 7 - j) {
                continue;
            }

            if (state[i][j] === 1 && map[i][j] === 0)
                wrong++;

            // console.log(map[i][j] === 1);

            if (state[i][j] === 1 && map[i][j] === 1) {
                correct++;
            }

        }
    }

    $("#wrong").text(wrong);
    $("#correct").text(correct);
}