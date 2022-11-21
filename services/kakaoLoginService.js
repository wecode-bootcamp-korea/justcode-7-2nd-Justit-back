const kakaoLoginDao = require('../models/kakaoLoginDao');

const axios = require('axios');
const jwt = require('jsonwebtoken');

const signInKakao = async kakaoToken => {
  const result = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
  });
  const { data } = result;
  const email = data.kakao_account.email;
  const name = data.properties.nickname;
  const kakaoId = data.id;

  if (!email || !name || !kakaoId) throw new error('KEY_ERROR', 400);

  const user = await kakaoLoginDao.getUserById(kakaoId);

  if (!user) {
    await kakaoLoginDao.signUp(email, name, kakaoId);
  }

  return jwt.sign({ kakao_id: user[0].kakao_id }, process.env.SECRET_KEY);
};

module.exports = {
  signInKakao,
};
