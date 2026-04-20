const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');
const userViewController = require('../controllers/userViewController');

router.get('/users-page', isAuthenticated, userViewController.getUsersPage);
router.get('/users-page/:email', isAuthenticated, userViewController.getUserDetailPage);

module.exports = router;