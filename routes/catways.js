const express = require('express');
const router = express.Router();

const catwayController = require('../controllers/catwayController');
const reservationRoutes = require('./reservations');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { handleValidationErrors } = require('../middlewares/validationMiddleware');
const { catwayIdValidation, createCatwayValidation, updateCatwayValidation } = require('../middlewares/catwayValidation');

router.get('/', isAuthenticated, catwayController.getAllCatways);
router.get('/:id', isAuthenticated, catwayIdValidation, handleValidationErrors, catwayController.getCatwayById);
router.post('/', isAuthenticated, createCatwayValidation, handleValidationErrors, catwayController.createCatway);
router.put('/:id', isAuthenticated, catwayIdValidation, updateCatwayValidation, handleValidationErrors, catwayController.updateCatway);
router.delete('/:id', isAuthenticated, catwayIdValidation, handleValidationErrors, catwayController.deleteCatway);

router.use('/:id/reservations', reservationRoutes);

module.exports = router;