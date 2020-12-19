const mongoose = require('mongoose');
const config = require('../../config');

const { Schema } = mongoose;

const vacanciesSchema = new Schema({
  branch: String,
  country: String,
  company: String,
  urlImage: String,
  position: String,
  salary: Number,
  coin: String,
  requirements: String,
  skills: String,
  details: String,
  tags: [String],
  surveys: {
    applicantStartUrl: String,
    applicantEndUrl: String,
    bossStartUrl: String,
    bossEndUrl: String,
  },
  isRemote: {
    type: Boolean,
    default: true,
  },
  nameBoss: String,
  emailBoss: String,
  applicantQuestion: String,
  author: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  filled: {
    type: Schema.Types.ObjectId,
    ref: config.dbCollections.applications,
    default: null,
  },
  idCompany: {
    type: Schema.Types.ObjectId,
    ref: config.dbCollections.companies,
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

const vacanciesModel = mongoose.model(
  config.dbCollections.vacancies,
  vacanciesSchema
);

module.exports = { vacanciesModel, vacanciesSchema };
