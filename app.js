const express = require('express');
const routes = require('./routes');
const morgan = require('morgan');
const cors = require('cors');
const { morganCustomFormat } = require('./utils/myutils');

const createApp = () => {
  const app = express();
  const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(morgan(morganCustomFormat));
  app.use(routes);

  return app;
};

module.exports = { createApp };
