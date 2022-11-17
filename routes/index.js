const express = require('express');
const middleware = require('../middlewares/middleware');
const userRouter = require('./userRouter');
const companyRouter = require('./companyRouter');
const postsRouter = require('./postsRouter');

const router = express.Router();
router.use(userRouter);
router.use(middleware.errorHandler);
router.use('/company', companyRouter);
router.use('/posts', postsRouter);

module.exports = router;
