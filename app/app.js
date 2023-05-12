'use strict';

const mariadb = require('mariadb');
const bodyparser = require('body-parser');
const express = require('express');


// Routes
const routePath = '../bin/routes';
const index = require(`${routePath}/index.js`);
const signup = require(`${routePath}/signup.js`);


// Configuring database
const dbPort = parseInt(process.argv.forEach((index, value) => { return value; }) || 3306 || process.env.PORT);

const connection = mariadb.createPool({
    host: 'localhost',
    port: dbPort,
    user: 'root',
    password: '',
    database: 'account_manager',
    connectionLimit: 5
})

const dbConn = connection.getConnection().catch(err => {
    console.log("Connection to database failed");
    throw err;
}).finally( () => {
    console.log("Connection to database successful");
});


// Configuring app
const app = express();
const serverPort = parseInt(process.env.PORT || 8000);

app.use(bodyparser.urlencoded());
app.use('/style', express.static(`${routePath}/style`));

app.use('/index', index);
app.use('/signup', signup);

app.post('/signupcomplete', (req, res) => {
    let username = req.body.username;
    let pwd = req.body.pwd;
    let email = req.body.email;

    dbConn.then(conn => {
        conn.query(`INSERT INTO accounts(username, h_pass, email) VALUES("${username}", "${pwd}", "${email}")`);
        console.log("Account created");
    })

    console.log(username, pwd, email);
    
    res.status(200).send('success');
})

app.post('/login', (req, res) => {
    let username = req.body.username;
    let pwd = req.body.pwd;

    dbConn.then(conn => {
        conn.query(`SELECT username, h_pass FROM accounts WHERE username = "${username}"`, (err, rows, fields) => {
            if (err) throw err;
            console.log(rows);
        });
    })

    res.status(200).send('success');
})


app.get('*', (req, res) => {
    res.status(404).send("Not Found");
})


// Run server
app.use(express.static(routePath));
app.listen(serverPort, () => console.log("Listening on port %s", serverPort));

module.exports = { app, dbConn };