const express = require('express')
const mariadb = require('mariadb')

const connection = {
    host: 'localhost:3307',
    user: 'root',
    passsword: '5AD%53u3',
    connectionLimit: 5
}

mariadb.createPool(connection);