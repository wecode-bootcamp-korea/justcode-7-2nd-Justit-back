const express = require('express');
const middleware = require('../middlewares/tokenError');
const userRouter = require('./userRouter');
const companyRouter = require('./companyRouter');

const router = express.Router();
router.use(userRouter);
router.use(middleware.errorHandler);
router.use('/company', companyRouter);

module.exports = router;
