const mongoose = require('mongoose');
const config = require('../../config');

const { Schema } = mongoose;

const userSchema = new Schema({
  fistName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  branch: String,
  skills: [String],
  languages: [String],
  github: String,
  linkedIn: String,
  interests: [String],
  country: String,
  mobility: String,
  workExperience: String,
  education: String,
  coachId: {
    type: Schema.Types.ObjectId,
    ref: config.dbCollections.coaches,
    default: null,
  },
  masterStartDate: {
    type: Date,
    default: Date.now,
  },
  masterEndDate: {
    type: Date,
    default: Date.now,
  },
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

const userModel = mongoose.model(config.dbCollections.users, userSchema);

module.exports = { userModel, userSchema };
