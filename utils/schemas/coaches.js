const mongoose = require('mongoose');
const config = require('../../config');

const { Schema } = mongoose;

const coachSchema = new Schema({
  fistName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  languages: [String],
  linkedIn: String,
  country: String,
  enabled: {
    type: Boolean,
    default: true,
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

const coachModel = mongoose.model(config.dbCollections.coaches, coachSchema);

module.exports = { coachModel, coachSchema };
