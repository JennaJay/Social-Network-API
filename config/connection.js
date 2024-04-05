const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/networkDB';

connect(connectionString);

module.exports = connection;