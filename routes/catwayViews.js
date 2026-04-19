const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');
const catwayViewController = require('../controllers/catwayViewController');

router.get('/catways-page', isAuthenticated, catwayViewController.getCatwaysPage);
router.get('/catways-page/:id', isAuthenticated, catwayViewController.getCatwayDetailPage);

module.exports = router;