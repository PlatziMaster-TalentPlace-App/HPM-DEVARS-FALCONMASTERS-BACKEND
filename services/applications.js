const mongoose = require('mongoose');
const config = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const HOST = config.dbHost;
const DB_NAME = config.dbName;

const { applicationModel } = require('../utils/schemas/applications');

class ApplicationService {
  constructor() {
    mongoose.connect(
      `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    this.db = mongoose.connection;
  }

  async createApplication(application) {
    const new_application = new applicationModel(application);
    const applicationId = (await new_application.save())._id;
    return applicationId;
  }

  async getApplicationsByUsers({ userId, status, page, limit }) {
    const query = { userId: userId };
    if (status) query.status = status;

    const applications = await applicationModel
      .find(query)
      .skip(page ? parseInt(page) * parseInt(limit) : 0)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })
      .exec();

    return applications;
  }

  async getApplication(applicationId) {
    const application = await applicationModel.findById(applicationId).exec();
    return application;
  }
}

module.exports = ApplicationService;
