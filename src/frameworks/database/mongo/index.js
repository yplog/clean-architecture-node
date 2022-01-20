const mongoose = require('mongoose');
const schemas = require('./schemas');

module.exports = {
  connect: (uri, callback) => {
    const db_conn_str = process.env.DB_CONNECTION_STRING || '27017';
    mongoose.connect(db_conn_str, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection to mongo has failed.'));
    db.on('open', () => {
      console.log('Successfully connected to mongo db cluster');
    });
  },
  schemas
};