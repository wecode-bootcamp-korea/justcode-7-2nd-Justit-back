const express = require('express');
const mw = require('../middlewares/middleware');
const { asyncWrap } = require('../utils/myutils');

const { signup, login, getMe } = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', asyncWrap(signup));
router.post('/login', asyncWrap(login));
router.get('/getme', asyncWrap(mw.authMiddleware), asyncWrap(getMe));

module.exports = router;
