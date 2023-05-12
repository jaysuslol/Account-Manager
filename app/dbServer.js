'use strict';

const mariadb = require('mariadb');

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

module.exports = dbConn;