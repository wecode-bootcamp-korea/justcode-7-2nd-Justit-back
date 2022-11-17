const express = require('express');
const router = express.Router();

const companyController = require('../controllers/companyController');


router.get('/:id', companyController.getCompanyPage);

module.exports = router;