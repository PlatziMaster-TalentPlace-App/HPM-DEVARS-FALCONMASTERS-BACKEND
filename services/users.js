const config = require('../config');
const database = require('../lib/mongodb/connect');

const { userModel } = require('../utils/schemas/users');

class UsersService {
  constructor() {
    this.db = database.connect('Users');
  }

  async createUser(user) {
    const new_user = new userModel(user);
    const userId = (await new_user.save())._id;
    return userId;
  }

  async getUsers({ branch, country, enabled, page, limit }) {
    const query = {};
    if (branch) query.branch = branch;
    if (country) query.country = country;

    if (typeof enabled !== 'undefined') query.enabled = enabled == 'true';
    limit = limit ? limit : config.dbLimit;

    const users = await userModel
      .find(query)
      .skip(page ? parseInt(page) * parseInt(limit) : 0)
      .limit(parseInt(limit))
      .sort({ createdAt: 1 })
      .exec();

    return users;
  }

  async getUsersByEmail(email) {
    const user = await userModel.findOne({ email }).exec();

    return user;
  }

  async getUser(userId) {
    const user = await userModel.findById(userId).exec();
    return user;
  }

  async updateUser(_id, data) {
    const user = await userModel.findOneAndUpdate({ _id }, data, {
      new: true,
      runValidators: true,
    });
    return user || false;
  }

  async toogleUser(_id) {
    let user = await userModel.findById(_id).exec();
    user = await userModel.findOneAndUpdate(
      { _id },
      { enabled: !user.enabled },
      { new: true }
    );
    return user || false;
  }
}

module.exports = UsersService;
