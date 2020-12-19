const config = require('../config');
const database = require('../lib/mongodb/connect');

const { goalModel } = require('../utils/schemas/goals');

class GoalsService {
  constructor() {
    this.db = database.connect(config.dbCollections.goals);
  }

  async createGoal(goal) {
    const new_goal = new goalModel(goal);
    const goalId = (await new_goal.save())._id;
    return goalId;
  }

  async getGoals({ userId, enabled, page, limit }) {
    const query = {};

    query.userId = userId;
    if (typeof enabled !== 'undefined') query.enabled = enabled == 'true';
    limit = limit ? limit : config.dbLimit;

    const goal = await goalModel
      .find(query)
      .skip(page ? parseInt(page) * parseInt(limit) : 0)
      .limit(parseInt(limit))
      .sort({ createdAt: 1 })
      .exec();

    return goal;
  }

  async getGoal(goalId) {
    const goal = await goalModel.findById(goalId).exec();
    return goal;
  }

  async updateGoal(_id, data) {
    const goal = await goalModel.findOneAndUpdate({ _id }, data, {
      new: true,
      runValidators: true,
    });
    return goal || false;
  }

  async finishToogleGoal(_id) {
    let goal = await goalModel.findById(_id).exec();
    goal = await goalModel.findOneAndUpdate(
      { _id },
      { isFinished: !goal.isFinished },
      { new: true }
    );
    return goal || false;
  }

  async toogleGoal(_id) {
    let goal = await goalModel.findById(_id).exec();
    goal = await goalModel.findOneAndUpdate(
      { _id },
      { enabled: !goal.enabled },
      { new: true }
    );
    return goal || false;
  }
}

module.exports = GoalsService;
