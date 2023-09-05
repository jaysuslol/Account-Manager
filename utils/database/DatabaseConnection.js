const DatabaseServer = require('./DatabaseServer');
const DB_CONN_LIMIT = 5;
const port = parseInt('3307');

const dbConn = new DatabaseServer('localhost', port, 'root', process.env.DB_PASS, 'account_manager', DB_CONN_LIMIT);

module.exports = dbConn;