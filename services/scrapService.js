const scrapDao = require('../models/scrapDao');

// 스크랩 추가
const addPostScrap = async (posts_id, userId) => {
  const addPost = await scrapDao.addPostScrap(posts_id, userId);
  return addPost;
};

// 스크랩 보기
const findPostByUserId = async userId => {
  const findPost = await scrapDao.findPostByUserId(userId);
  return findPost;
};

// 스크랩 삭제
const deletePost = async (posts_id, userId) => {
  const deletePost = await scrapDao.deletePost(posts_id, userId);
  return deletePost;
};

module.exports = {
  addPostScrap,
  findPostByUserId,
  deletePost,
};
