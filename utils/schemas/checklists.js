const mongoose = require('mongoose');
const config = require('../../config');

const { Schema } = mongoose;

const checklistSchema = new Schema({
  name: String,
  description: String,
  order: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
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

const checklistModel = mongoose.model(
  config.dbCollections.checklists,
  checklistSchema
);

module.exports = { checklistModel, checklistSchema };
