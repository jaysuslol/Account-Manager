var path = require('path');
var express = require('express');
var app = express();

const dir = '../www';

class Server {
    constructor (p) {
        this.initServer(p);
    }

    initServer(serverPort) {
        app.use(express.static(dir));
        app.listen(serverPort, () => console.log("Listening on port %s", serverPort))
    }
}

module.exports = Server;