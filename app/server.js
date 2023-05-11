'use strict';

const mariadb = require('mariadb');

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

module.exports = dbConn;