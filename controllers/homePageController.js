const homePageService = require('../services/homePageService');

const getHomePage = async (req, res) => {
  try {
      const result = await homePageService.getHomePage();
      res.status(200).json(result);
  } catch(err) {
    console.log(err);
    res.status(400).json({ message : err.message });
  }

}

module.exports = { getHomePage };