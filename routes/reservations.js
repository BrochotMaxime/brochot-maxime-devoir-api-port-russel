const express = require('express');
const router = express.Router({ mergeParams: true });

const reservationController = require('../controllers/reservationController');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { handleValidationErrors } = require('../middlewares/validationMiddleware');
const { catwayIdParamValidation, reservationIdParamValidation, createReservationValidation, updateReservationValidation } = require('../middlewares/reservationValidation');

router.get('/', isAuthenticated, catwayIdParamValidation, handleValidationErrors, reservationController.getReservationsByCatway);
router.get('/:reservationId', isAuthenticated, catwayIdParamValidation, reservationIdParamValidation, handleValidationErrors, reservationController.getReservationById);
router.post('/', isAuthenticated, catwayIdParamValidation, createReservationValidation, handleValidationErrors, reservationController.createReservation);
router.put('/:reservationId', isAuthenticated, catwayIdParamValidation, reservationIdParamValidation, updateReservationValidation, handleValidationErrors, reservationController.updateReservation);
router.delete('/:reservationId', isAuthenticated, catwayIdParamValidation, reservationIdParamValidation, handleValidationErrors, reservationController.deleteReservation);

module.exports = router;