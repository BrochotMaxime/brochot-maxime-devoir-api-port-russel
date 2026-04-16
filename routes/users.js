const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { handleValidationErrors } = require('../middlewares/validationMiddleware');
const { createUserValidation, updateUserValidation, emailParamValidation } = require('../middlewares/userValidation');

router.get('/', isAuthenticated, userController.getAllUsers);
router.get('/:email', isAuthenticated, emailParamValidation, handleValidationErrors, userController.getUserByEmail);
router.post('/', isAuthenticated, createUserValidation, handleValidationErrors, userController.createUser);
router.put('/:email', isAuthenticated, emailParamValidation, updateUserValidation, handleValidationErrors, userController.updateUser);
router.delete('/:email', isAuthenticated, emailParamValidation, handleValidationErrors, userController.deleteUser);

module.exports = router;