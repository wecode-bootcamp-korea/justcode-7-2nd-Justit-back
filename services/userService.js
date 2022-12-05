const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userDao = require('../models/userDao');

const signup = async (email, name, password) => {
  // email 필수 값 체크
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    throw { message: '아이디는 이메일 형식이여야 합니다.' };
  }
  // email 중복 여부
  const existUser = await userDao.existUser(email);
  if (existUser) {
    throw { message: '이미 존재하는 아이디입니다.' };
  }

  const pwRegex =
    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

  if (!pwRegex.test(password)) {
    throw {
      message:
        '비밀번호는 영문, 숫자, 특수문자를 포함하여 8~16자리를 입력해주세요.',
    };
  }
  // 비밀번호 암호화
  const hashed_password = bcrypt.hashSync(password, bcrypt.genSaltSync());
  const createUser = await userDao.createUser(email, name, hashed_password);
  return createUser;
};

const login = async (email, password) => {
  // 아이디가 email 형식이 아닐 때
  if (!email.includes('@') || !email.includes('.')) {
    throw { message: '아이디는 이메일 형식이여야 합니다.' };
  }

  // email이 존재하지 않을 때
  const findUserByEmail = await userDao.findUserByEmail(email);

  if (!findUserByEmail) {
    throw { message: '아이디가 존재하지 않거나 비밀번호가 일치하지 않습니다.' };
  }
  // 비밀번호가 일치하지 않을 경우
  const isSame = bcrypt.compareSync(password, findUserByEmail.password);
  if (isSame === false) {
    throw { message: '아이디가 존재하지 않거나 비밀번호가 일치하지 않습니다.' };
  }

  // 토큰 생성
  const token = jwt.sign({ id: findUserByEmail.id }, process.env.SECRET_KEY);
  return token;
};

const getMe = async userId => {
  const userInfo = await userDao.findUserById(userId);
  return userInfo;
};

// 메일 변경
const updateUserEmail = async (email, userId) => {
  const updateEmail = await userDao.updateUserEmail(email, userId);
  return updateEmail;
};

// 계정 탈퇴
const deleteUserById = async (email, userId) => {
  const deleteUser = await userDao.deleteUserById(email, userId);
  return deleteUser;
};

module.exports = { signup, login, getMe, updateUserEmail, deleteUserById };
