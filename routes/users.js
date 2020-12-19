const express = require('express');
const UsersService = require('../services/users');

function usersApi(app) {
  const router = express.Router();
  app.use('/api/users', router);

  const usersService = new UsersService();

  router.get('/', async function (req, res, next) {
    const { branch, country, enabled, page, limit } = req.query;
    const users = await usersService.getUsers({
      branch,
      country,
      enabled,
      page,
      limit,
    });

    try {
      res.status(200).json({
        data: users,
        message: 'users retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:userId', async function (req, res, next) {
    const { userId } = req.params;
    const user = await usersService.getUser(userId);

    try {
      res.status(200).json({
        data: user,
        message: 'user retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async function (req, res, next) {
    const user = req.body;
    try {
      const userId = await usersService.createUser(user);
      res.status(201).json({
        data: userId,
        message: 'user created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:userId', async function (req, res, next) {
    const { userId } = req.params;
    const user = req.body;

    try {
      const updated = await usersService.updateUser(userId, user);
      res.status(201).json({
        data: updated,
        message: 'user updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:userId', async function (req, res, next) {
    const { userId } = req.params;

    try {
      const deleted = await usersService.toogleUser(userId);
      res.status(201).json({
        data: deleted,
        message: 'user updated',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = usersApi;
