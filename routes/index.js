const express = require('express');
const middleware = require('../middlewares/middleware');
const userRouter = require('./user.route');

const router = express.Router();
router.use(userRouter);
router.use(middleware.errorHandler);

module.exports = router;
