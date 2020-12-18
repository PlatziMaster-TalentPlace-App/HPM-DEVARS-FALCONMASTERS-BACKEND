const boom = require('@hapi/boom');

function notFoundHandler(_, res) {
  const {
    output: { statusCode, payload },
  } = boom.notFound();

  res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;
