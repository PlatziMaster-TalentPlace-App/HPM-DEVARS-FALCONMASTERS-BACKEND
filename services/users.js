const mongoose = require('mongoose');
const config = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const HOST = config.dbHost;
const DB_NAME = config.dbName;

const { userModel } = require('../utils/schemas/users');

class UsersService {
  constructor() {
    mongoose.connect(
      `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    this.db = mongoose.connection;
  }

  async createUser(user) {
    const new_user = new userModel(user);
    const userId = (await new_user.save())._id;
    return userId;
  }

  async getUsersByEmail(email) {
    const user = await userModel.findOne({ email }).exec();

    return user;
  }

  async getUser(userId) {
    const user = await userModel.findById(userId).exec();
    return user;
  }
}

module.exports = UsersService;
