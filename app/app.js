'use strict';

const bodyparser = require('body-parser');
const express = require('express');
const Server = require('./server');

// Routes
const routePath = '../bin/routes';
const index = require(`${routePath}/index.js`);
const signup = require(`${routePath}/signup.js`);

// Configuring app
const app = express();
const serverPort = parseInt(process.env.PORT || 8000);

app.use(bodyparser.json());

app.use('/style', express.static(`${routePath}/style`));
app.use('/index', index);
app.use('/signup', signup);
app.get('*', (req, res) => {
    res.status(404).send("Not Found");
})

// Run server
app.use(express.static(routePath));
app.listen(serverPort, () => console.log("Listening on port %s", serverPort));

module.exports = app;