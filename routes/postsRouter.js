const express = require('express');
const router = express.Router();

const postsController = require('../controllers/postsController');


router.get('/:id', postsController.getPostsPage);

module.exports = router;