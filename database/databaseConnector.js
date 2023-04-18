const express = require('express')
const mariadb = require('mariadb')

const connection = {
    host: 'localhost:3307',
    user: 'root',
    password: '',
    connectionLimit: 5
}

mariadb.createPool(connection);