const userService = require('../services/user.service');
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

  res.status(201).json({ message: 'loginSuccess', token: result });
};

const getMe = async (req, res) => {
  const userInfo = await userService.getMe(req.userInfo.id);

  res.status(201).json({ userInfo });
};

module.exports = { signup, login, getMe };
