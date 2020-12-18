const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('../config');

<<<<<<< HEAD
const vacantsApi = require('../routes/vacants');

const app = express();

// middlewares
=======
const app = express();

>>>>>>> 7fa100cfce812e03c3727b1a3340854af8afc45f
app.use(helmet());
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// Routes
vacantsApi(app);

=======
>>>>>>> 7fa100cfce812e03c3727b1a3340854af8afc45f
app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
