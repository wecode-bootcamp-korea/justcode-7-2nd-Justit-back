const homePageService = require('../services/homePageService');

const getHomePage = async (req, res) => {
  try {
      const result = await homePageService.getHomePage();
      res.status(200).json(result);
  } catch(err) {
    console.log(err);
    res.status(err.statusCode).json({ message : err.message });
  }

}

module.exports = { getHomePage };