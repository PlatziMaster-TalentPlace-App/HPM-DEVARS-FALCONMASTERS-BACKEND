const mongoose = require('mongoose');
const config = require('../../config');

const { Schema } = mongoose;

const companiesSchema = new Schema({
  name: String,
  urlImage: String,
  description: String,
  country: String,
  nameBoss: String,
  emailBoss: {
    type: String,
    required: true,
    unique: true,
  },
  languages: [String],
  facebook: String,
  youtube: String,
  glassdoor: String,
  linkedIn: String,
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

const companyModel = mongoose.model(
  config.dbCollections.companies,
  companiesSchema
);

module.exports = { companyModel, companiesSchema };
