const express = require('express');
const router = express.Router();
const mw = require('../middlewares/tokenError');
const { asyncWrap } = require('../utils/myutils');

const resumeController = require('../controllers/resumeController');


// router.get(
//   '/get',
//   asyncWrap(mw.authMiddleware),
//   asyncWrap(resumeController.getuserinfo)
// );
router.get(
  '/getall',
  asyncWrap(mw.authMiddleware),
  asyncWrap(resumeController.getresumeinfo)

);
router.post(
  '/post',
  asyncWrap(mw.authMiddleware),
  asyncWrap(resumeController.postResume)
);
router.put(
  '/update',
  asyncWrap(mw.authMiddleware),
  asyncWrap(resumeController.updateResume)
);

module.exports = router;
