const express = require('express');
const middleware = require('../middlewares/tokenError');
const userRouter = require('./userRouter');
const homePageRouter = require('./homePageRouter');
const companyRouter = require('./companyRouter');
const postsRouter = require('./postsRouter');
const mypageRouter = require('./mypageRouter');
const searchRouter = require('./searchRouter');
const applyRouter = require('./applyRouter');

const router = express.Router();
router.use(userRouter);
router.use(middleware.errorHandler);
router.use('/', homePageRouter);
router.use('/company', companyRouter);
router.use('/posts', postsRouter);
router.use('/mypage', mypageRouter);
router.use('/search', searchRouter);
router.use('/apply', applyRouter);

module.exports = router;
