const express = require('express');
const router = express.Router();
const mw = require('../middlewares/middleware');
const { asyncWrap } = require('../utils/myutils');

const { signup, login, getMe } = require('../controllers/userController');

router.post('/signup', asyncWrap(signup));
router.post('/login', asyncWrap(login));
router.get('/getme', asyncWrap(mw.authMiddleware), asyncWrap(getMe));

module.exports = router;
