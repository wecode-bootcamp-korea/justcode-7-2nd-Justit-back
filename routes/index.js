const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const resumeRouter = require('./resumeRouter');
const companyRouter = require('./companyRouter');

router.use(userRouter);
router.use('/resume', resumeRouter);
router.use('/company', companyRouter);

module.exports = router;
