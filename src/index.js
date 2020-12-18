const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('../config');

const vacantsApi = require('../routes/vacants');

const app = express();

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
vacantsApi(app);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
