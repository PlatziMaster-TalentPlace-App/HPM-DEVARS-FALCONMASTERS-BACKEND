const mongoose = require('mongoose');
const config = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const HOST = config.dbHost;
const DB_NAME = config.dbName;

const { vacanciesModel } = require('../utils/schemas/vacancies');

class VacanciesServices {
  constructor() {
    mongoose.connect(
      `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`
    );
    this.db = mongoose.connection;
  }

  async createVacant(vacant) {
    const new_vacant = new vacanciesModel(vacant);
    const vacantId = (await new_vacant.save())._id;
    return vacantId;
  }
}

module.exports = VacanciesServices;
