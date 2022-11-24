const express = require('express');
const router = express.Router();
const mw = require('../middlewares/tokenError');
const { asyncWrap } = require('../utils/myutils');

const applyController = require('../controllers/applyController');

router.get(
  '/modal',
  asyncWrap(mw.authMiddleware),
  asyncWrap(applyController.getresume)
);
router.post(
  '/first',
  asyncWrap(mw.authMiddleware),
  asyncWrap(applyController.applyFirst)
);
router.get(
  '/ing',
  asyncWrap(mw.authMiddleware),
  asyncWrap(applyController.getApplying)
);
router.put(
  '/second',
  asyncWrap(mw.authMiddleware),
  asyncWrap(applyController.applySecond)
);
router.get(
  '/ed',
  asyncWrap(mw.authMiddleware),
  asyncWrap(applyController.getApplyed)
);
module.exports = router;
