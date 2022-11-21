const express = require('express');
const router = express.Router();
const mw = require('../middlewares/tokenError');
const { asyncWrap } = require('../utils/myutils');
const { signInKakao } = require('../controllers/kakaoLoginController');

router.post(
  '/kakao/signin',
  asyncWrap(mw.authMiddleware),
  asyncWrap(signInKakao)
);

module.exports = router;
