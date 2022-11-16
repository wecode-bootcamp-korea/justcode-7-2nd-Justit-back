const express = require('express');
const router = express.Router();

const userRouter = require('./user');
// const otherRouter = require('./other');
const companyRouter = require('./companyRouter');



router.use(userRouter);
// router.use(otherRouter);
router.use('/company', companyRouter);

module.exports = router;
