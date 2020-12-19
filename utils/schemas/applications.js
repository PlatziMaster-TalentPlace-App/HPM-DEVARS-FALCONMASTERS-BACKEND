const mongoose = require('mongoose');
const config = require('../../config');

const { Schema } = mongoose;

const applicationSchema = new Schema({
  vacantId: String,
  userId: String,
  status: String,
  urlCV: String,
  coachRecommendation: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const applicationModel = mongoose.model(
  config.dbCollections.applications,
  applicationSchema
);

module.exports = { applicationModel, applicationSchema };
