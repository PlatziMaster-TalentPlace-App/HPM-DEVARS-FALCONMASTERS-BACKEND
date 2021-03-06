const mongoose = require('mongoose');
const config = require('../../config/');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const HOST = config.dbHost;
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`;

module.exports = {
  connection: null,
  connect: (modelName = '') => {
    if (this.connection) return this.connection;
    return mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    }).then(connection => {
      this.connection = connection;
      console.log(`Sucessfull connection to DB ${modelName}`);
    }).catch(err => console.log('err', err));
  }
};