const searchService = require('../services/searchService');

const searchPosts = async (req, res) => {
  try {
    const keyword = req.query.keyword
    const tag = req.query.tag
    const getPosts = await searchService.searchPosts(keyword, tag)
    // console.log(keyword)
    // console.log(tag)
    // console.log(tag.length)
    res.status(200).json(getPosts)
  } catch (err) {
    console.log(err)
    res.status(err.statusCode).json({ message: err.message });
  }
}

module.exports = { searchPosts }