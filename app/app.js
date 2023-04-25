'use strict';

const express = require('express');
const Server = require('./server');

// Configuring app server
const app = express();
const serverPort = process.env.PORT || 8000;
app.set('port', serverPort);


// Run server & store variables in localStorage
new Server(serverPort);

module.exports.serverPort = serverPort;