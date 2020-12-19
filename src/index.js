const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('../config');

const notFoundHandler = require('../middlewares/notFoundHandler');

const vacanciesApi = require('../routes/vacancies');
const usersApi = require('../routes/users');
const applicationsApi = require('../routes/applications');

const app = express();

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
vacanciesApi(app);
usersApi(app);
applicationsApi(app);

// Catch 404
app.use(notFoundHandler);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
