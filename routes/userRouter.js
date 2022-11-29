const express = require('express');
const router = express.Router();
const mw = require('../middlewares/tokenError');
const { asyncWrap } = require('../utils/myutils');

const {
  signup,
  login,
  getMe,
  updateUserEmail,
  deleteUserById,
} = require('../controllers/userController');

router.post('/signup', asyncWrap(signup));
router.post('/login', asyncWrap(login));
router.get('/getme', asyncWrap(mw.authMiddleware), asyncWrap(getMe));
router.put(
  '/account',
  asyncWrap(mw.authMiddleware),
  asyncWrap(updateUserEmail)
);
router.delete(
  '/leave',
  asyncWrap(mw.authMiddleware),
  asyncWrap(deleteUserById)
);

module.exports = router;
