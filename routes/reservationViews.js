const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');
const reservationViewController = require('../controllers/reservationViewController');

router.get('/reservations-page', isAuthenticated, reservationViewController.getReservationsPage);
router.get('/reservations-page/new', isAuthenticated, reservationViewController.getNewReservationPage);
router.post('/reservations-page', isAuthenticated, reservationViewController.createReservationFromView);
router.get('/reservations-page/:id/edit', isAuthenticated, reservationViewController.getEditReservationPage);
router.post('/reservations-page/:id/update', isAuthenticated, reservationViewController.updateReservationFromView);
router.post('/reservations-page/:id/delete', isAuthenticated, reservationViewController.deleteReservationFromView);
router.get('/reservations-page/:id', isAuthenticated, reservationViewController.getReservationDetailPage);

module.exports = router;