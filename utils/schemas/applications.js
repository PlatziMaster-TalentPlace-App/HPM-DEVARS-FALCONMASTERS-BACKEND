const mongoose = require('mongoose');
const config = require('../../config');

const { Schema } = mongoose;

const applicationSchema = new Schema({
  vacantId: String,
  userId: String,
  status: {
    type: [
      {
        type: String,
        enum: [
          'APPLY',
          'ACEPTED_BY_COACH',
          'CONTACT_BOSS',
          'INTERVIEW_PROCESS',
          'REFUSED',
          'ACCEPTED',
        ],
      },
    ],
    default: ['APPLY'],
  },
  urlCV: String,
  userAnswer: String,
  coachRecommendation: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const applicationModel = mongoose.model(
  config.dbCollections.applications,
  applicationSchema
);

module.exports = { applicationModel, applicationSchema };
