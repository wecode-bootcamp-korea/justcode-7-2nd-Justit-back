const express = require('express');
const router = express.Router();
const mw = require('../middlewares/tokenError');

const resumeController = require('../controllers/resumeController');

router.put('/update', mw.authMiddleware, resumeController.putResume);

module.exports = router;
