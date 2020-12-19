const express = require('express');
const GoalsService = require('../services/goals');

function checklistsApi(app) {
  const router = express.Router();
  app.use('/api/goals', router);

  const goalsService = new GoalsService();

  router.get('/:userId/all', async function (req, res, next) {
    const { userId } = req.params;
    const { enabled, page, limit } = req.query;
    const goals = await goalsService.getGoals({
      userId,
      enabled,
      page,
      limit,
    });

    try {
      res.status(200).json({
        data: goals,
        message: 'goals retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:goalId', async function (req, res, next) {
    const { goalId } = req.params;
    const goal = await goalsService.getGoal(goalId);

    try {
      res.status(200).json({
        data: goal,
        message: 'goal retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async function (req, res, next) {
    const goal = req.body;
    try {
      const goalId = await goalsService.createGoal(goal);
      res.status(201).json({
        data: goalId,
        message: 'goal created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:goalId', async function (req, res, next) {
    const { goalId } = req.params;
    const goal = req.body;

    try {
      const updated = await goalsService.updateGoal(goalId, goal);
      res.status(201).json({
        data: updated,
        message: 'goal updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:goalId/finish', async function (req, res, next) {
    const { goalId } = req.params;

    try {
      const finished = await goalsService.finishToogleGoal(goalId);
      res.status(201).json({
        data: finished,
        message: 'goal finished',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:goalId', async function (req, res, next) {
    const { goalId } = req.params;

    try {
      const deleted = await goalsService.toogleGoal(goalId);
      res.status(201).json({
        data: deleted,
        message: 'goal deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = checklistsApi;
