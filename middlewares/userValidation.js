const { body, param } = require('express-validator');


const createUserValidation = [
        body('username').trim()
                .notEmpty().withMessage("Le nom d'utilisateur est requis")
                .isLength({ min: 3, max: 50 }).withMessage("Le nom d'utilisateur doit contenir entre 3 et 50 caractères"),
        body('email').trim()
                .notEmpty().withMessage("L'email est requis")
                .isEmail().withMessage("L'adresse e-mail est invalide")
                .normalizeEmail(),
        body('password')
                .notEmpty().withMessage("Le mot de passe est requis")
                .isLength({ min: 8 }).withMessage("Le mot de passe doit contenir au moins 8 caractères")
];


const updateUserValidation = [
        body('username').trim()
                .optional()
                .isLength({ min: 3, max: 50 }).withMessage("Le nom d'utilisateur doit contenir entre 3 et 50 caractères"),
        body('email').trim()
                .optional()
                .isEmail().withMessage("L'adresse e-mail est invalide")
                .normalizeEmail(),
        body('password')
                .optional()
                .isLength({ min: 8 }).withMessage("Le mot de passe doit contenir au moins 8 caractères")
];


const emailParamValidation = [
        param('email').trim()
                .isEmail().withMessage("L'email dans l'URL est invalide")
                .normalizeEmail()
];

module.exports = { createUserValidation, updateUserValidation, emailParamValidation };