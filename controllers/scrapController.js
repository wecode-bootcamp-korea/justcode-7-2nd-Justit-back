const scrapService = require('../services/scrapService');
const utils = require('../utils/myutils');

// 스크랩 추가
const addPostScrap = async (req, res) => {
  const { posts_id } = req.body;
  const userId = req.userInfo.id;
  utils.checkDataIsNotEmpty({ posts_id, userId });

  await scrapService.addPostScrap(posts_id, userId);

  res.status(201).json({ message: 'SCRAP_SUCCESS' });
};

// 스크랩 보기
const findPostByUserId = async (req, res) => {
  const userId = req.userInfo.id;
  utils.checkDataIsNotEmpty({ userId });

  const findPost = await scrapService.findPostByUserId(userId);

  res.status(200).json({ message: 'FIND_SCRAP_LIST', data: findPost });
};

// 스크랩 삭제
const deletePost = async (req, res) => {
  const { posts_id } = req.body;
  const userId = req.userInfo.id;
  utils.checkDataIsNotEmpty({ posts_id, userId });

  await scrapService.deletePost(posts_id, userId);

  res.status(201).json({ message: 'DELETE_SCRAP_SUCCESSFULLY' });
};

module.exports = {
  addPostScrap,
  findPostByUserId,
  deletePost,
};
