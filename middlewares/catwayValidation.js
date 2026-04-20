const { body, param } = require('express-validator');

/**
 * Validation du paramètre :id pour les routes liées aux catways
 * 
 * @param {Array} catwayIdValidation 
 * @returns {void}
 */
const catwayIdValidation = [
        param('id')
                .notEmpty().withMessage("L'identifiant du catway est requis")
                .isInt({ min: 1 }).withMessage("L'identifiant du catway doit être un entier positif")
                .toInt()
];

/**
 * Validation des champs nécessaires à la création d'un catway
 * 
 * @param {Array} createCatwayValidation
 * @returns {void}
 */
const createCatwayValidation = [
        body('catwayNumber')
                .notEmpty().withMessage('Le numéro du catway est requis')
                .isInt({ min: 1 }).withMessage('Le numéro du catway doit être un entier positif')
                .toInt(),
        body('catwayType').trim()
                .notEmpty().withMessage('Le type du catway est requis')
                .isIn(['long', 'short']).withMessage('Le type du catway doit être "long" ou "short"'),
        body('catwayState').trim()
                .notEmpty().withMessage("L'état du catway est requis")
                .isLength({ min: 3, max: 500 }).withMessage("L'état du catway doit contenir entre 3 et 500 caractères")
];

/**
 * Validation des champs nécessaires à la mise à jour d'un catway
 * 
 * @param {Array} updateCatwayValidation
 * @returns {void}
 */
const updateCatwayValidation = [
        body('catwayState').trim()
                .notEmpty().withMessage("L'état du catway est requis")
                .isLength({ min: 3, max: 500 }).withMessage("L'état du catway doit contenir entre 3 et 500 caractères"),
        body('catwayNumber')
                .not()
                .exists().withMessage('Le numéro du catway ne peut pas être modifié'),
        body('catwayType')
                .not()
                .exists().withMessage('Le type du catway ne peut pas être modifié')
];

module.exports = { catwayIdValidation, createCatwayValidation, updateCatwayValidation };