const config = require('../config');
const database = require('../lib/mongodb/connect');

const { coachModel } = require('../utils/schemas/coaches');

class CoachesService {
  constructor() {
    this.db = database.connect(config.dbCollections.coaches);
  }

  async createCoach(coach) {
    const new_coach = new coachModel(coach);
    const coachId = (await new_coach.save())._id;
    return coachId;
  }

  async getCoaches({ enabled, page, limit }) {
    const query = {};

    if (typeof enabled !== 'undefined') query.enabled = enabled == 'true';
    limit = limit ? limit : config.dbLimit;

    const coaches = await coachModel
      .find(query)
      .skip(page ? parseInt(page) * parseInt(limit) : 0)
      .limit(parseInt(limit))
      .sort({ createdAt: 1 })
      .exec();

    return coaches;
  }

  async getCoach(coachId) {
    const coach = await coachModel.findById(coachId).exec();
    return coach;
  }

  async updateCoach(_id, data) {
    const coach = await coachModel.findOneAndUpdate({ _id }, data, {
      new: true,
      runValidators: true,
    });
    return coach || false;
  }

  async toogleCoach(_id) {
    let coach = await coachModel.findById(_id).exec();
    coach = await coachModel.findOneAndUpdate(
      { _id },
      { enabled: !coach.enabled },
      { new: true }
    );
    return coach || false;
  }
}

module.exports = CoachesService;
