const express = require('express');

function vacanciesApi(app) {
  const router = express.Router();
  app.use('/api/vacancies', router);

  router.get('/', async function (req, res, next) {
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

  router.post('/', async function (req, res, next) {});
}

module.exports = vacanciesApi;
