'use strict';

const bodyparser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');


const loginPath = require('./routes/login/login.js');
const signupPath = require('./routes/signup/signup.js');
const forgotPath = require('./routes/forgot/forgot.js');
const auth = require('./routes/auth.js');

require('./utils/database/DatabaseServer.js');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/style', express.static('./routes/style'));
app.use('/auth', auth);
app.use('/login', loginPath);
app.use('/signup', signupPath);
app.use('/forgot', forgotPath);

app.get('*', (req, res) => {
    res.status(404).send("404: Not Found");
})

module.exports = app;