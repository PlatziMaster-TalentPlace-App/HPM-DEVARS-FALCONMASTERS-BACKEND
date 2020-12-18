const express = require('express');
const VacanciesService = require('../services/vacancies');

function vacanciesApi(app) {
  const router = express.Router();
  app.use('/api/vacancies', router);

  const vacanciesService = new VacanciesService();

  router.get('/', async function (req, res, next) {
    const { branch, country, smax, smin, enabled, page, limit } = req.query;
    const vacancies = await vacanciesService.getVacancies({
      branch,
      country,
      smax,
      smin,
      enabled,
      page,
      limit,
    });

    try {
      res.status(200).json({
        data: vacancies,
        message: 'vacancies retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:vacantId', async function (req, res, next) {
    const { vacantId } = req.params;
    const vacant = await vacanciesService.getVacant(vacantId);

    try {
      res.status(200).json({
        data: vacant,
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
