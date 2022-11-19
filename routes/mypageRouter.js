const express = require('express');
const router = express.Router();
const mw = require('../middlewares/tokenError');
const { asyncWrap } = require('../utils/myutils');

const {
  addPostScrap,
  findPostByUserId,
  deletePost,
  updateUserEmail,
  deleteUserById,
} = require('../controllers/mypageController');

router.post('/scrap', asyncWrap(mw.authMiddleware), asyncWrap(addPostScrap));
router.get('/scrap', asyncWrap(mw.authMiddleware), asyncWrap(findPostByUserId));
router.delete('/scrap', asyncWrap(mw.authMiddleware), asyncWrap(deletePost));
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
