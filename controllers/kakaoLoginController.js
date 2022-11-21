const kakaoLoginService = require('../services/kakaoLoginService');

const signInKakao = async (req, res) => {
  const headers = req.headers['authorization'];
  const kakaoToken = headers.split(' ')[1];

  const accessToken = await kakaoLoginService.signInKakao(kakaoToken);

  return res.status(200).json({ accessToken: accessToken });
};

module.exports = {
  signInKakao,
};
