const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/networkDB';

// connect(connectionString);
connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log('Connected successfully to MongoDB');
})
.catch(err => {
console.error('Error occurred while connecting to MongoDB', err);
});

module.exports = connection;