window.$ = window.jQuery = module.exports;

function htmlMap() {

    for (let i = 0; i < 8; i++) {

        $("#floor").append("<div class='rowCell' id='row" + i + "'></div>");

        for (let j = 0; j < 8; j++) {

            $("#row" + i).append("<div class='cell' id='cell" + i + j + "' onclick='press(" + i + " ," + j + ")'></div>");


            if (i === j || i === 7 - j) {

                $("#cell" + i + j).addClass("none");
                continue;
            }

            $("#cell" + i + j).click(function() {
                $("#cell" + i + j).addClass("red");
            });

        }
    }
}

htmlMap();

function press(i, j) {
    console.log(i + " " + j);
}