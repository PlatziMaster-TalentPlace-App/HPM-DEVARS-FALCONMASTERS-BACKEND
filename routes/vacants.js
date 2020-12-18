const express = require('express');

function vacantsApi(app) {
  const router = express.Router();
  app.use('/api/vacants', router);

  router.get('/', async function (req, res, next) {
    try {
      res.status(200).json({
        data: 'test',
        message: 'vacants retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:vacantId', async function (req, res, next) {
    try {
      res.status(200).json({
        data: 'test',
        message: 'vacants retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async function (req, res, next) {});
}

module.exports = vacantsApi;
