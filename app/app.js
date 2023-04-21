'use strict';

const express = require('express');
const DatabaseConnector = require('./DatabaseConnector');
const Server = require('./server');


// Configuring database server
const dbPort = process.argv.forEach((index, value) => { return value; }) || 3306 || process.env.PORT;
//DatabaseConnector.createConn(dbPort);

// Configuring app server
const app = express();
const serverPort = process.env.PORT || 8000;
app.set('port', serverPort);

// Run server
new Server(serverPort);