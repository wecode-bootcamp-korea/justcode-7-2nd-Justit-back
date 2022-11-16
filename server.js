const { createApp } = require('./app');

const app = createApp();

// init
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Server is running on port ${PORT}.`);
});
