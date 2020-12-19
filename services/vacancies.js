const mongoose = require('mongoose');
const config = require('../config');

const database = require('../lib/mongodb/connect');

const { vacanciesModel } = require('../utils/schemas/vacancies');

class VacanciesService {
  constructor() {
    this.db = database.connect();
  }

  async createVacant(vacant) {
    const new_vacant = new vacanciesModel(vacant);
    const vacantId = (await new_vacant.save())._id;
    return vacantId;
  }

  async getVacancies({ branch, country, smax, smin, enabled, page, limit }) {
    const query = {};
    if (branch) query.branch = branch;
    if (country) query.country = country;

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
      .skip(page ? parseInt(page) * parseInt(limit) : 0)
      .limit(parseInt(limit))
      .sort({ createdAt: 1 })
      .exec();

    return vacancies;
  }

  async getVacant(vacantId) {
    const vacant = await vacanciesModel.findById(vacantId).exec();
    return vacant;
  }

  async updateVacant(_id, data) {
    const vacant = await vacanciesModel.findOneAndUpdate({ _id }, data, { new: true, runValidators: true });
    return vacant || false;
  }

  async toogleVacant(_id) {
    let vacant = await vacanciesModel.findById(_id).exec();
    vacant = await vacanciesModel.findOneAndUpdate({ _id }, { enabled: !vacant.enabled }, { new: true });
    return vacant || false;
  }

  async filledVacant(_id, applicationId) {
    const vacant = await vacanciesModel.findOneAndUpdate({ _id }, { filled: applicationId }, { new: true });
    return vacant || false;
  }
}

module.exports = VacanciesService;
