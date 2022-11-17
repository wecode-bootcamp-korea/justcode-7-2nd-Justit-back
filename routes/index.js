const express = require('express');
const router = express.Router();

const middleware = require('../middlewares/tokenError');
const userRouter = require('./userRouter');
const resumeRouter = require('./resumeRouter');
const companyRouter = require('./companyRouter');

router.use(userRouter);
router.use(middleware.errorHandler);
router.use('/resume', resumeRouter);
router.use('/company', companyRouter);

module.exports = router;
