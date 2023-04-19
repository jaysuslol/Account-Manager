const express = require('express')
const mariadb = require('mariadb')

class DatabaseConnector {

    static createPool() {
        const connection = {
            host: '127.0.0.1',
            port: 3307,
            user: 'root',
            password: '8h%6Z4#7',
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
            console.log('Connection error; check pool settings & internet connectivity');
        } finally {
            if (conn) {
                console.log('Connection successful');
                conn.query('INSERT INTO accounts(username, h_pass, email) VALUES("test", 12515, "sifja")');

                return conn.end();
            }
        }
        
    }
}

module.exports = DatabaseConnector;