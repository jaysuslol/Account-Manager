'use strict';

const express = require('express');

const app = express();
const dir = '../bin/';

class Server {
    constructor (p) {
        this.initServer(p);
    }

    initServer(serverPort) {
        app.use(express.static(dir));
        app.listen(serverPort, () => console.log("Listening on port %s", serverPort));
        return 1;
    }
}

module.exports = Server