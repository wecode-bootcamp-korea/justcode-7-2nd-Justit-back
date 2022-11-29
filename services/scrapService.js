const mypageDao = require('../models/scrapDao');

// 스크랩 추가
const addPostScrap = async (posts_id, userId) => {
  const addPost = await mypageDao.addPostScrap(posts_id, userId);
  return addPost;
};

// 스크랩 보기
const findPostByUserId = async userId => {
  const findPost = await mypageDao.findPostByUserId(userId);
  return findPost;
};

// 스크랩 삭제
const deletePost = async (posts_id, userId) => {
  const deletePost = await mypageDao.deletePost(posts_id, userId);
  return deletePost;
};

module.exports = {
  addPostScrap,
  findPostByUserId,
  deletePost,
};
