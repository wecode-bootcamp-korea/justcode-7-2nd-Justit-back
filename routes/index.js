const express = require('express');
<<<<<<< HEAD
const router = express.Router();

const userRouter = require('./user');
const resumeRouter = require('./resumeRouter');
const companyRouter = require('./companyRouter');

router.use(userRouter);
router.use('/resume', resumeRouter);
=======
const middleware = require('../middlewares/tokenError');
const userRouter = require('./userRouter');
const companyRouter = require('./companyRouter');

const router = express.Router();
router.use(userRouter);
router.use(middleware.errorHandler);
>>>>>>> main
router.use('/company', companyRouter);

module.exports = router;
