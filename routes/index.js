const express = require('express');
const router = express.Router();

const middleware = require('../middlewares/tokenError');
const userRouter = require('./userRouter');
const resumeRouter = require('./resumeRouter');
const homePageRouter = require('./homePageRouter');
const companyRouter = require('./companyRouter');
const postsRouter = require('./postsRouter');
const mypageRouter = require('./mypageRouter');

router.use(userRouter);
router.use(middleware.errorHandler);
router.use('/resume', resumeRouter);
router.use('/', homePageRouter);
router.use('/company', companyRouter);
router.use('/posts', postsRouter);
router.use('/mypage', mypageRouter);

module.exports = router;
