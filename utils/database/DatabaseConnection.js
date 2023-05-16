const DatabaseServer = require('./DatabaseServer');
const DB_CONN_LIMIT = 5;
const port = parseInt(process.env.PORT || '3307');

const dbConn = new DatabaseServer('localhost', port, 'root', '', 'account_manager', DB_CONN_LIMIT);

module.exports = dbConn;