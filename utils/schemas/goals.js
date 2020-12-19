const mongoose = require('mongoose');
const config = require('../../config');

const { Schema } = mongoose;

const goalsSchema = new Schema({
  name: String,
  description: String,
  endDate: {
    type: Date,
    default: Date.now,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: config.dbCollections.users,
    default: null,
  },
  reviewByCoach: {
    type: Schema.Types.ObjectId,
    ref: config.dbCollections.coaches,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const goalModel = mongoose.model(config.dbCollections.goals, goalsSchema);

module.exports = { goalModel, goalsSchema };
