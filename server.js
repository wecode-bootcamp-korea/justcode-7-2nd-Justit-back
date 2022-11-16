const dotenv = require('dotenv');
dotenv.config();

const { createApp } = require('./app');

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT || 8001;

  app.listen(PORT, () => {
    console.log(`server start : http://localhost:${PORT}/`);
  });
};

startServer();
