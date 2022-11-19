const mypageDao = require('../models/mypageDao');

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

// 메일 변경
const updateUserEmail = async (email, userId) => {
  const updateEmail = await mypageDao.updateUserEmail(email, userId);
  return updateEmail;
};

// 계정 탈퇴
const deleteUserById = async (email, userId) => {
  const deleteUser = await mypageDao.deleteUserById(email, userId);
  return deleteUser;
};

module.exports = {
  addPostScrap,
  findPostByUserId,
  deletePost,
  updateUserEmail,
  deleteUserById,
};
