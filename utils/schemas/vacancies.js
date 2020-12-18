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
  enabled: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const vacanciesModel = mongoose.model(
  config.dbCollections.vacancies,
  vacanciesSchema
);

module.exports = { vacanciesModel, vacanciesSchema };
