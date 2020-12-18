const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('../config');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
