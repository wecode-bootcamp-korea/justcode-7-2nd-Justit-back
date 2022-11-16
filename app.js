const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const router = require('./routes');
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
  app.use(router);

  return app;
};

module.exports = { createApp };
