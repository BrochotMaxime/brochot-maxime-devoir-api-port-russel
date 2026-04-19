const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');
const reservationViewController = require('../controllers/reservationViewController');

router.get('/reservations-page', isAuthenticated, reservationViewController.getReservationsPage);
router.get('/reservations-page/:id', isAuthenticated, reservationViewController.getReservationDetailPage);

module.exports = router;