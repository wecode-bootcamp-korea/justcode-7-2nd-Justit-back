const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const morgan = require('morgan');
const { morganCustomFormat } = require('./utils/myutils');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

const createApp = () => {
  const app = express();
  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(morgan(morganCustomFormat));
  app.use(routes);

  return app;
};

module.exports = { createApp };
