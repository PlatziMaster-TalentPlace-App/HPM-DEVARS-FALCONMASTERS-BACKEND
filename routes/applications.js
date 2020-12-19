const express = require('express');
const ApplicationService = require('../services/applications');

function applicationsApi(app) {
  const router = express.Router();
  app.use('/api/applications', router);

  const applicationService = new ApplicationService();

  router.get('/', async function (req, res, next) {
    const { userId, status, page, limit } = req.query;

    const applications = await applicationService.getApplicationsByUsers({
      userId,
      status,
      page,
      limit,
    });

    try {
      res.status(200).json({
        data: applications,
        message: 'applications retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:applicationId', async function (req, res, next) {
    const { applicationId } = req.params;
    const application = await applicationService.getApplication(applicationId);

    try {
      res.status(200).json({
        data: application,
        message: 'application retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async function (req, res, next) {
    const application = req.body;
    try {
      const applicationId = await applicationService.createApplication(
        application
      );
      res.status(201).json({
        data: applicationId,
        message: 'application created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:applicationId', async function (req, res, next) {
    const { userId } = req.params;

    try {
      const deleted = await applicationService.toogleApplication(userId);
      res.status(201).json({
        data: deleted,
        message: 'application deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = applicationsApi;
