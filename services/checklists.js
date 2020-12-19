const config = require('../config');
const database = require('../lib/mongodb/connect');

const { checklistModel } = require('../utils/schemas/checklists');

class ChecklistsService {
  constructor() {
    this.db = database.connect(config.dbCollections.checklists);
  }

  async createChecklist(checklist) {
    const new_checklist = new checklistModel(checklist);
    const checklistId = (await new_checklist.save())._id;
    return checklistId;
  }

  async getChecklists({ userId, enabled, page, limit }) {
    const query = {};

    query.userId = userId;
    if (typeof enabled !== 'undefined') query.enabled = enabled == 'true';
    limit = limit ? limit : config.dbLimit;

    const checklist = await checklistModel
      .find(query)
      .skip(page ? parseInt(page) * parseInt(limit) : 0)
      .limit(parseInt(limit))
      .sort({ order: -1 })
      .exec();

    return checklist;
  }

  async getChecklist(checklistId) {
    const checklist = await checklistModel.findById(checklistId).exec();
    return checklist;
  }

  async updateChecklist(_id, data) {
    const coach = await checklistModel.findOneAndUpdate({ _id }, data, {
      new: true,
      runValidators: true,
    });
    return coach || false;
  }

  async rateChecklist(_id, ratePoint) {
    const checklist = await checklistModel.findOneAndUpdate(
      { _id },
      { rating: ratePoint },
      { new: true }
    );
    return checklist || false;
  }

  async orderUpChecklist(_id) {
    let checklist = await checklistModel.findById(_id).exec();
    checklist = await checklistModel.findOneAndUpdate(
      { _id },
      { order: checklist.order + 1 },
      { new: true }
    );
    return checklist || false;
  }

  async orderDownChecklist(_id) {
    let checklist = await checklistModel.findById(_id).exec();
    checklist = await checklistModel.findOneAndUpdate(
      { _id },
      { order: checklist.order - 1 },
      { new: true }
    );
    return checklist || false;
  }

  async toogleChecklist(_id) {
    let checklist = await checklistModel.findById(_id).exec();
    checklist = await checklistModel.findOneAndUpdate(
      { _id },
      { enabled: !checklist.enabled },
      { new: true }
    );
    return checklist || false;
  }
}

module.exports = ChecklistsService;
