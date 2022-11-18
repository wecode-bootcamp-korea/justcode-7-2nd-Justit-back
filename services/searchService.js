const searchDao = require('../models/searchDao');

const searchPosts = async keyword => {
  const findPosts = await searchDao.searchPosts(keyword)
  return findPosts
}

module.exports = { searchPosts }