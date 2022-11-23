const homePageDao = require('../models/homePageDao');

const getHomePage = async () => {
  const randomPosts = await homePageDao.randomPosts();
  const timeLimitPosts = await homePageDao.timeLimitPosts();
  const popularPosts = await homePageDao.popularPosts();
  const responseFastCompany = await homePageDao.responseFastCompany();
  const newPosts = await homePageDao.newPosts();
  const result = { randomPosts, timeLimitPosts, popularPosts, responseFastCompany, newPosts };
  return result;


}

module.exports = { getHomePage };