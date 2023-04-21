'use strict';

const mariadb = require('mariadb')
const index = document.getElementById('index');

class DatabaseConnector {
    static createPool(p) {
        const connection = {
            host: 'localhost',
            port: p,
            user: 'root',
            password: '',
            database: 'account_manager',
            connectionLimit: 5
        }

        this.createConn(connection);
    }

    static async createConn(connection) {
        const pool = mariadb.createPool(connection);
        let conn;
        try {
            conn = await pool.getConnection()
        } catch (err) {
            console.log('Connection error; check pool settings or database connectivity');
        } finally {
            if (conn) {
                console.log('Connection successful');
                while (true) {

                }
            }
        }
        
    }
}

module.exports = DatabaseConnector;