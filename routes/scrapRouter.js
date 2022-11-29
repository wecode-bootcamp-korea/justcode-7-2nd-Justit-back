const express = require('express');
const router = express.Router();
const mw = require('../middlewares/tokenError');
const { asyncWrap } = require('../utils/myutils');

const {
  addPostScrap,
  findPostByUserId,
  deletePost,
} = require('../controllers/scrapController');

router.post('/scrap', asyncWrap(mw.authMiddleware), asyncWrap(addPostScrap));
router.get('/scrap', asyncWrap(mw.authMiddleware), asyncWrap(findPostByUserId));
router.delete('/scrap', asyncWrap(mw.authMiddleware), asyncWrap(deletePost));

module.exports = router;
