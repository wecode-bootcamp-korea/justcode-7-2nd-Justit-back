const userService = require('../services/userService');
const utils = require('../utils/myutils');

const signup = async (req, res) => {
  const { email, name, password } = req.body;
  utils.checkDataIsNotEmpty({ email, name, password });

  await userService.signup(email, name, password);

  res.status(201).json({ message: 'USER_CREATED' });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  utils.checkDataIsNotEmpty({ email, password });

  const result = await userService.login(email, password);

  res.status(200).json({ message: 'LOGIN_SUCCESS', token: result });
};

const getMe = async (req, res) => {
  const userInfo = await userService.getMe(req.userInfo.id);

  res.status(200).json({ userInfo });
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

module.exports = { signup, login, getMe, updateUserEmail, deleteUserById };
