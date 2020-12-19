const config = require('../config');
const database = require('../lib/mongodb/connect');

const { companyModel } = require('../utils/schemas/companies');

class ConpaniesService {
  constructor() {
    this.db = database.connect(config.dbCollections.companies);
  }

  async createCompany(Company) {
    const new_company = new companyModel(Company);
    const companyId = (await new_company.save())._id;
    return companyId;
  }

  async getCompanies({ country, enabled, page, limit }) {
    const query = {};
    if (country) query.country = country;

    if (typeof enabled !== 'undefined') query.enabled = enabled == 'true';
    limit = limit ? limit : config.dbLimit;

    const companies = await companyModel
      .find(query)
      .skip(page ? parseInt(page) * parseInt(limit) : 0)
      .limit(parseInt(limit))
      .sort({ createdAt: 1 })
      .exec();

    return companies;
  }

  async getCompany(companyId) {
    const company = await companyModel.findById(companyId).exec();
    return company;
  }

  async updateCompany(_id, data) {
    const company = await companyModel.findOneAndUpdate({ _id }, data, {
      new: true,
      runValidators: true,
    });
    return company || false;
  }

  async toogleCompany(_id) {
    let company = await companyModel.findById(_id).exec();
    company = await companyModel.findOneAndUpdate(
      { _id },
      { enabled: !company.enabled },
      { new: true }
    );
    return company || false;
  }
}

module.exports = ConpaniesService;
