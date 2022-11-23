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

module.exports = router;
