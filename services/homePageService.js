const homePageDao = require('../models/homePageDao');

const getHomePage = async () => {
  const popularPosts = await homePageDao.popularPosts();
  const responseFastCompany = await homePageDao.responseFastCompany();
  const newPosts = await homePageDao.newPosts()
  const result = { popularPosts, responseFastCompany, newPosts }
  return result
}

module.exports = { getHomePage }