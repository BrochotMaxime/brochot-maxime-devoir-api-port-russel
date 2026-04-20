const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');
const reservationViewController = require('../controllers/reservationViewController');

router.get('/reservations-page', isAuthenticated, reservationViewController.getReservationsPage);
router.get('/reservations-page/new', isAuthenticated, reservationViewController.getNewReservationPage);
router.post('/reservations-page', isAuthenticated, reservationViewController.createReservation);
router.get('/reservations-page/:id/edit', isAuthenticated, reservationViewController.getEditReservationPage);
router.post('/reservations-page/:id/update', isAuthenticated, reservationViewController.updateReservation);
router.post('/reservations-page/:id/delete', isAuthenticated, reservationViewController.deleteReservation);
router.get('/reservations-page/:id', isAuthenticated, reservationViewController.getReservationDetailPage);

module.exports = router;