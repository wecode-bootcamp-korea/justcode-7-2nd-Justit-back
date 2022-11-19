const searchDao = require('../models/searchDao');

const searchPosts = async (keyword, tag) => {
  const findPosts = await searchDao.searchPosts(keyword, tag)
  return findPosts
}

module.exports = { searchPosts }