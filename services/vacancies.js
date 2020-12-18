const mongoose = require('mongoose');
const config = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const HOST = config.dbHost;
const DB_NAME = config.dbName;

const { vacanciesModel } = require('../utils/schemas/vacancies');

class VacanciesService {
  constructor() {
    mongoose.connect(
      `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    this.db = mongoose.connection;
  }

  async createVacant(vacant) {
    const new_vacant = new vacanciesModel(vacant);
    const vacantId = (await new_vacant.save())._id;
    return vacantId;
  }

  async getVacancies({ branch, country, smax, smin, enabled, page, limit }) {
    const query = {
      branch,
      country,
    };
    if (smin) query.salary = { $gt: parseInt(smin) };
    if (smax) {
      query.salary = query.salary
        ? { ...query.salary, $lt: parseInt(smax) }
        : { $lt: smax };
    }
    if (typeof enabled !== 'undefined') query.enabled = enabled == 'true';
    limit = limit ? limit : config.dbLimit;

    const vacancies = await vacanciesModel
      .find(query)
      .skip(parseInt(page ? page * limit : 0))
      .limit(parseInt(limit))
      .sort({ createdAt: 1 })
      .exec();

    return vacancies;
  }
  async getVacant(vacantId) {
    const vacant = await vacanciesModel.findById(vacantId).exec();
    return vacant;
  }
}

module.exports = VacanciesService;
