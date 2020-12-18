const express = require('express');
const VacanciesService = require('../services/vacancies');

function vacanciesApi(app) {
  const router = express.Router();
  app.use('/api/vacancies', router);

  const vacanciesService = new VacanciesService();

  router.get('/', async function (req, res, next) {
    const { position, country, smax, smin } = req.query;
    try {
      res.status(200).json({
        data: 'test',
        message: 'vacancies retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:vacantId', async function (req, res, next) {
    try {
      res.status(200).json({
        data: 'test',
        message: 'vacant retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async function (req, res, next) {
    const vacant = req.body;
    try {
      const vacantId = await vacanciesService.createVacant(vacant);
      res.status(201).json({
        data: vacantId,
        message: 'vacant created',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = vacanciesApi;
