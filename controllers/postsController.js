const postsService = require('../services/postsService');

const getPosts = async (req, res) => {
  try {
    const tag = req.query.tag || '';
    const techStack = req.query.techStack || '';
    const positionId = req.query.position || "''";
    const location = decodeURIComponent(req.query.location) || null;
    const career = req.query.career || null;
    const result = await postsService.getPosts(tag, techStack, positionId, location, career);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
}

const getPostsPage = async (req, res) => {
  try {
    const postsId = req.params.id;
    const postpage = await postsService.getPostsPage(postsId);
    res.status(200).json(postpage);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  };
};


module.exports = { getPosts, getPostsPage };