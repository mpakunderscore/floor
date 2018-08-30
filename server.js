//SERVER

let express = require('express');
let path = require('path');

let app = express();

//STATIC WEB
app.use(express.static(path.join(__dirname, 'web')));

let server = require('http').Server(app);

const port = process.env.PORT || 6060;

server.listen(port);

app.get('/message', function (request, response) {

    let message = request.query.text;
    console.log(message);

    response.json({});
});