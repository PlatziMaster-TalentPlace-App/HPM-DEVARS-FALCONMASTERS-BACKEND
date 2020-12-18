const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('../config');

const vacanciesApi = require('../routes/vacancies');

const app = express();

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
vacanciesApi(app);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
