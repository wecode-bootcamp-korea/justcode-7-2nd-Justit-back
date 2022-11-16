const express = require('express');
const router = express.Router();

const userRouter = require('./user');
// const otherRouter = require('./other');
const companyRouter = require('./companyRouter');
const postsRouter = require('./postsRouter');


router.use(userRouter);
// router.use(otherRouter);
router.use('/company', companyRouter);
router.use('/posts', postsRouter);

module.exports = router;
