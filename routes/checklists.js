const express = require('express');
const ChecklistsService = require('../services/checklists');

function checklistsApi(app) {
  const router = express.Router();
  app.use('/api/checklists', router);

  const checklistsService = new ChecklistsService();

  router.get('/:userId/all', async function (req, res, next) {
    const { userId } = req.params;
    const { enabled, page, limit } = req.query;
    const checklists = await checklistsService.getChecklists({
      userId,
      enabled,
      page,
      limit,
    });

    try {
      res.status(200).json({
        data: checklists,
        message: 'checklists retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:checklistId', async function (req, res, next) {
    const { checklistId } = req.params;
    const checklist = await checklistsService.getChecklist(checklistId);

    try {
      res.status(200).json({
        data: checklist,
        message: 'checklist retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async function (req, res, next) {
    const checklist = req.body;
    try {
      const checklistId = await checklistsService.createChecklist(checklist);
      res.status(201).json({
        data: checklistId,
        message: 'checklist created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:checklistId', async function (req, res, next) {
    const { checklistId } = req.params;
    const checklist = req.body;

    try {
      const updated = await checklistsService.updateChecklist(
        checklistId,
        checklist
      );
      res.status(201).json({
        data: updated,
        message: 'checklist updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:checklistId/rate/:ratePoint', async function (req, res, next) {
    const { checklistId, ratePoint } = req.params;

    try {
      const updated = await checklistsService.rateChecklist(
        checklistId,
        ratePoint
      );
      res.status(201).json({
        data: updated,
        message: 'checklist updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:checklistId/order/up', async function (req, res, next) {
    const { checklistId } = req.params;

    try {
      const updated = await checklistsService.orderUpChecklist(checklistId);
      res.status(201).json({
        data: updated,
        message: 'checklist up',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:checklistId/order/down', async function (req, res, next) {
    const { checklistId } = req.params;

    try {
      const updated = await checklistsService.orderDownChecklist(checklistId);
      res.status(201).json({
        data: updated,
        message: 'checklist down',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:checklistId', async function (req, res, next) {
    const { checklistId } = req.params;

    try {
      const deleted = await checklistsService.toogleChecklist(checklistId);
      res.status(201).json({
        data: deleted,
        message: 'checklist deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = checklistsApi;
