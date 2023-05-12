'use strict';

const bodyparser = require('body-parser');
const express = require('express');


// Routes
const routePath = '../bin/routes';
const login = require(`${routePath}/login.js`);
const signup = require(`${routePath}/signup.js`);


// Configuring app
const app = express();
const serverPort = parseInt(process.env.PORT || 8000);

app.use(express.json());
app.use(bodyparser.urlencoded());
app.use('/style', express.static(`${routePath}/style`));
app.use('/api/auth', require('./route.js'));

app.use('/login', login);
app.use('/signup', signup);

app.get('*', (req, res) => {
    res.status(404).send("404: Not Found");
})


// Run server
app.use(express.static(routePath));
app.listen(serverPort, () => console.log("Listening on port %s", serverPort));

module.exports = app;