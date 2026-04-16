const express = require('express');
const router = express.Router({ mergeParams: true });

const reservationController = require('../controllers/reservationController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/', isAuthenticated, reservationController.getReservationsByCatway);
router.get('/:reservationId', isAuthenticated, reservationController.getReservationById);
router.post('/', isAuthenticated, reservationController.createReservation);
router.put('/:reservationId', isAuthenticated, reservationController.updateReservation);
router.delete('/:reservationId', isAuthenticated, reservationController.deleteReservation);

module.exports = router;