const express = require('express');
const CompaniesService = require('../services/companies');

function companiesApi(app) {
  const router = express.Router();
  app.use('/api/companies', router);

  const companiesService = new CompaniesService();

  router.get('/', async function (req, res, next) {
    const { country, enabled, page, limit } = req.query;
    const companies = await companiesService.getCompanies({
      country,
      enabled,
      page,
      limit,
    });

    try {
      res.status(200).json({
        data: companies,
        message: 'companies retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:companyId', async function (req, res, next) {
    const { companyId } = req.params;
    const company = await companiesService.getCompany(companyId);

    try {
      res.status(200).json({
        data: company,
        message: 'companies retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async function (req, res, next) {
    const company = req.body;
    try {
      const companyId = await companiesService.createCompany(company);
      res.status(201).json({
        data: companyId,
        message: 'companies created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:companyId', async function (req, res, next) {
    const { companyId } = req.params;
    const company = req.body;

    try {
      const updated = await companiesService.updateCompany(companyId, company);
      res.status(201).json({
        data: updated,
        message: 'company updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:companyId', async function (req, res, next) {
    const { companyId } = req.params;

    try {
      const deleted = await companiesService.toogleCompany(companyId);
      res.status(201).json({
        data: deleted,
        message: 'company deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = companiesApi;
