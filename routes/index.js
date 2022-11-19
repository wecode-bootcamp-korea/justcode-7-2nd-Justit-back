const express = require('express');
const middleware = require('../middlewares/tokenError');
const userRouter = require('./userRouter');
const companyRouter = require('./companyRouter');
const postsRouter = require('./postsRouter');
const mypageRouter = require('./mypageRouter');

const router = express.Router();
router.use(userRouter);
router.use(middleware.errorHandler);
router.use('/company', companyRouter);
router.use('/posts', postsRouter);
router.use('/mypage', mypageRouter);

module.exports = router;
