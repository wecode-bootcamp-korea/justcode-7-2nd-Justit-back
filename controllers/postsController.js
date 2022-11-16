const postsService = require('../services/postsService');

const getPostsPage = async (req, res) => {
  try {
    const postsId = req.params.id;
    const postpage = await postsService.getPostsPage(postsId);
    res.status(200).json(postpage);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message })
  }
}


module.exports = { getPostsPage }