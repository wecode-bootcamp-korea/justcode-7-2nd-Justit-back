const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/middleware');
const userRouter = require('./user.route');
const companyRouter = require('./companyRouter');
const postsRouter = require('./postsRouter');

router.use(userRouter);
router.use(middleware.errorHandler);
router.use('/company', companyRouter);
router.use('/posts', postsRouter);

module.exports = router;
