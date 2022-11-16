const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const morgan = require('morgan')


const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(routes);
  app.use(morgan('combined'))

  app.use((err, req, res) => {
    const { status, message } = err;
    console.log(err);
    res.status(status || 500).json({ message });
  });

  return app;
};

module.exports= { createApp }