const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');
const catwayViewController = require('../controllers/catwayViewController');

router.get('/catways-page', isAuthenticated, catwayViewController.getCatwaysPage);
router.get('/catways-page/new', isAuthenticated, catwayViewController.getNewCatwayPage);
router.post('/catways-page', isAuthenticated, catwayViewController.createCatwayFromView);
router.get('/catways-page/:id/edit', isAuthenticated, catwayViewController.getEditCatwayPage);
router.post('/catways-page/:id/update', isAuthenticated, catwayViewController.updateCatwayFromView);
router.post('/catways-page/:id/delete', isAuthenticated, catwayViewController.deleteCatwayFromView);
router.get('/catways-page/:id', isAuthenticated, catwayViewController.getCatwayDetailPage);


module.exports = router;