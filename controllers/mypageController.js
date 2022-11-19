const mypageService = require('../services/mypageService');
const utils = require('../utils/myutils');

// 스크랩 추가
const addPostScrap = async (req, res) => {
  const { posts_id } = req.body;
  const userId = req.userInfo.id;
  utils.checkDataIsNotEmpty({ posts_id, userId });

  await mypageService.addPostScrap(posts_id, userId);

  res.status(201).json({ message: 'SCRAP_SUCCESS' });
};

// 스크랩 보기
const findPostByUserId = async (req, res) => {
  const userId = req.userInfo.id;
  utils.checkDataIsNotEmpty({ userId });

  const findPost = await mypageService.findPostByUserId(userId);

  res.status(200).json({ message: 'FIND_SCRAP_LIST', data: findPost });
};

// 스크랩 삭제
const deletePost = async (req, res) => {
  const { posts_id } = req.body;
  const userId = req.userInfo.id;
  utils.checkDataIsNotEmpty({ posts_id, userId });

  await mypageService.deletePost(posts_id, userId);

  res.status(201).json({ message: 'DELETE_SCRAP_SUCCESSFULLY' });
};

// 메일 변경
const updateUserEmail = async (req, res) => {
  const { email } = req.body;
  const userId = req.userInfo.id;
  utils.checkDataIsNotEmpty({ email, userId });

  await mypageService.updateUserEmail(email, userId);

  res.status(201).json({ message: 'UPDATE_USER_EMAIL_SUCCESSFULLY' });
};

// 계정 탈퇴
const deleteUserById = async (req, res) => {
  const { email } = req.body;
  const userId = req.userInfo.id;
  utils.checkDataIsNotEmpty({ email, userId });

  await mypageService.deleteUserById(email, userId);

  res.status(201).json({ message: 'DELETE_USER_SUCCESSFULLY' });
};

module.exports = {
  addPostScrap,
  findPostByUserId,
  deletePost,
  updateUserEmail,
  deleteUserById,
};
