'use strict';

class DatabaseServer {
    #mariadb = require('mariadb');
    #pool;

    constructor(host, port, user, password, database, connectionLimit) {
        this.#pool = this.#mariadb.createPool({
            host: host,
            port: port,
            user: user,
            password: password,
            database: database,
            connectionLimit: connectionLimit
        });
    }

    async executeQuery(query) {
        let conn;

        try {
            conn = await this.#pool.getConnection();
            const rows = await conn.query(query);
            return rows;
        } catch (error) {
            console.log("Can't connect to database");
            throw error;
        } finally {
            if (conn) conn.end();
        }
    }
}

module.exports = DatabaseServer;