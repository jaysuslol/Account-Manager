'use strict';

const express = require('express');
const Server = require('./server');
const mariadb = require('mariadb');

// Configuring app server
const app = express();
const serverPort = parseInt(process.env.PORT || 8000);
app.set('port', serverPort);

// Run server
new Server(serverPort);

module.exports = {
    serverPort
};