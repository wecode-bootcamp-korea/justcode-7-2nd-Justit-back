const searchService = require('../services/searchService');

const searchPosts = async (req, res) => {
  try {
    const keyword = req.query.keyword || null;
    const tag = req.query.tag || '';
    const techStack = req.query.techStack || '';
    const positionId = req.query.position || "''";
    const location = req.query.location || null;
    const career = req.query.career || null;

    const REQUIRE_KEYS = [ keyword ];
    REQUIRE_KEYS.map((key) => {
      if (!key) {
        throw new Error('검색어를 입력해주세요');
      };
    });

    const getPosts =
    await searchService.searchPosts(keyword, tag, techStack, positionId, location, career);
    res.status(200).json(getPosts);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  };
};

module.exports = { searchPosts };