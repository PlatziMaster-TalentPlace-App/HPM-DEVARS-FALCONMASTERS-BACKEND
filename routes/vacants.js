const express = require('express');

function vacantsApi(app) {
  const router = express.Router();
  app.use('/api/vacats', router);

  router.get('/', async function (req, res, next) {
    try {
      res.status(200).json({
        data: 'test',
        message: 'test',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = vacantsApi;