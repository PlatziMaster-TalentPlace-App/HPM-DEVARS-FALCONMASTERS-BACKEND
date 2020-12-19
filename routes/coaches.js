const express = require('express');
const CoachesService = require('../services/coaches');

function coachesApi(app) {
  const router = express.Router();
  app.use('/api/coaches', router);

  const coachesService = new CoachesService();

  router.get('/', async function (req, res, next) {
    const { enabled, page, limit } = req.query;
    const coaches = await coachesService.getCoaches({
      enabled,
      page,
      limit,
    });

    try {
      res.status(200).json({
        data: coaches,
        message: 'coachs retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:coachId', async function (req, res, next) {
    const { coachId } = req.params;
    const coach = await coachesService.getCoach(coachId);

    try {
      res.status(200).json({
        data: coach,
        message: 'coach retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async function (req, res, next) {
    const coach = req.body;
    try {
      const coachId = await coachesService.createCoach(coach);
      res.status(201).json({
        data: coachId,
        message: 'coach created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:coachId', async function (req, res, next) {
    const { coachId } = req.params;
    const coach = req.body;

    try {
      const updated = await coachesService.updateCoach(coachId, coach);
      res.status(201).json({
        data: updated,
        message: 'coach updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:coachId', async function (req, res, next) {
    const { coachId } = req.params;

    try {
      const deleted = await coachesService.toogleCoach(coachId);
      res.status(201).json({
        data: deleted,
        message: 'coach updated',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = coachesApi;
