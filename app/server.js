'use strict';

const express = require('express');
const mariadb = require('mariadb');
const bodyparser = require('body-parser');
const App = require('./app.js');

var app = express();
var dir = '../bin/';

const dbPort = parseInt(process.argv.forEach((index, value) => { return value; }) || 3306 || process.env.PORT);

const connection = mariadb.createPool({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '8h%6Z4#7',
    database: 'account_manager',
    connectionLimit: 5
})

const dbConn = connection.getConnection().catch(err => {
    console.log("Connection to database failed");
    throw err;
}).finally( () => {
    console.log("Connection to database successful");
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: dir});
})

app.post('/signup', (req, res) => {
    let username = req.body.username;
    let pwd = req.body.pwd;
    let email = "fortnite";

    dbConn.then(conn => {
        conn.query(`INSERT INTO accounts(username, h_pass, email) VALUES("${username}", "${pwd}", "${email}")`);
        console.log("Account created");
    })
});

class Server {
    constructor (p) {
        this.initServer(p);
    }

    initServer(serverPort) {
        app.use(express.static(dir));
        app.listen(serverPort, () => console.log("Listening on port %s", serverPort));
    }
}

module.exports = Server