const homePageDao = require('../models/homePageDao');

const getHomePage = async () => {
  const randomPosts = await homePageDao.randomPosts();
  for (let i = 0; i < randomPosts.length; i++) {
    randomPosts[i].type = 'short';
  };

  const timeLimitPosts = await homePageDao.timeLimitPosts();
  for (let i = 0; i < timeLimitPosts.length; i++) {
    timeLimitPosts[i].type = 'short';
  };

  const popularPosts = await homePageDao.popularPosts();
  for (let i = 0; i < popularPosts.length; i++) {
    popularPosts[i].type = 'short';
  };

  const responseFastCompany = await homePageDao.responseFastCompany();
  for (let i = 0; i < responseFastCompany.length; i++) {
    responseFastCompany[i].type = 'long';
  };

  const newPosts = await homePageDao.newPosts();
  for (let i = 0; i < newPosts.length; i++) {
    newPosts[i].type = 'short';
  };

  const result = { randomPosts, timeLimitPosts, popularPosts, responseFastCompany, newPosts };

  return result;
}

module.exports = { getHomePage };