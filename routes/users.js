const express = require('express');
const UsersService = require('../services/users');

function usersApi(app) {
  const router = express.Router();
  app.use('/api/users', router);

  const usersService = new UsersService();

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
}

module.exports = usersApi;
