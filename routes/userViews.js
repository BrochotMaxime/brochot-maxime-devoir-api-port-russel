const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');
const userViewController = require('../controllers/userViewController');

router.get('/users-page', isAuthenticated, userViewController.getUsersPage);
router.get('/users-page/new', isAuthenticated, userViewController.getNewUserPage);
router.post('/users-page', isAuthenticated, userViewController.createUser);
router.get('/users-page/:email/edit', isAuthenticated, userViewController.getEditUserPage);
router.post('/users-page/:email/update', isAuthenticated, userViewController.updateUser);
router.post('/users-page/:email/delete', isAuthenticated, userViewController.deleteUser);
router.get('/users-page/:email', isAuthenticated, userViewController.getUserDetailPage);

module.exports = router;