const config = require('../config');
const database = require('../lib/mongodb/connect');

const { applicationModel } = require('../utils/schemas/applications');

class ApplicationService {
  constructor() {
    this.db = database.connect(config.dbCollections.applications);
  }

  async createApplication(application) {
    const new_application = new applicationModel(application);
    const applicationId = (await new_application.save())._id;
    return applicationId;
  }

  async getApplicationsByUsers({ userId, status, page, limit }) {
    const query = { userId: userId };
    if (status) query.status = status;
    limit = limit ? limit : config.dbLimit;

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

  async toogleApplication(_id) {
    let user = await applicationModel.findById(_id).exec();
    user = await applicationModel.findOneAndUpdate(
      { _id },
      { enabled: !user.enabled },
      { new: true }
    );
    return user || false;
  }
}

module.exports = ApplicationService;
