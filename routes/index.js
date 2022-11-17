const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/middleware');

const userRouter = require('./user.route');
const companyRouter = require('./companyRouter');

router.use(userRouter);
router.use(middleware.errorHandler);
router.use('/company', companyRouter);

module.exports = router;
