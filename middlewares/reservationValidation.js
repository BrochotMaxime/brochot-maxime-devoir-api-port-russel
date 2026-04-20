const { body, param } = require('express-validator');

/**
 * Validation du paramètre :id pour les routes liées aux reservations
 * 
 * @param {Array} reservationIdParamValidation
 * @returns {void}
 */
const catwayIdParamValidation = [
        param('id')
                .notEmpty().withMessage("L'identifiant du catway est requis")
                .isInt({ min: 1 }).withMessage("L'identifiant du catway doit être un entier positif")
                .toInt()
];

/**
 * Validation du paramètre :reservationId pour les routes liées aux reservations
 * 
 * @param {Array} reservationIdParamValidation
 * @returns {void}
 */
const reservationIdParamValidation = [
        param('reservationId')
                .notEmpty().withMessage("L'identifiant de la réservation est requis")
                .isMongoId().withMessage("L'identifiant de la réservation est invalide")
];

/**
 * Validation des champs nécessaires à la création d'une réservation
 * 
 * @param {Array} createReservationValidation
 * @returns {void}
 */
const createReservationValidation = [
        body('clientName').trim()
                .notEmpty().withMessage('Le nom du client est requis')
                .isLength({ min: 2, max: 100 }).withMessage('Le nom du client doit contenir entre 2 et 100 caractères'),
        body('boatName').trim()
                .notEmpty().withMessage('Le nom du bateau est requis')
                .isLength({ min: 2, max: 100 }).withMessage('Le nom du bateau doit contenir entre 2 et 100 caractères'),
        body('startDate')
                .notEmpty().withMessage('La date de début est requise')
                .isISO8601().withMessage('La date de début doit être une date valide au format ISO 8601')
                .toDate(),
        body('endDate')
                .notEmpty().withMessage('La date de fin est requise')
                .isISO8601().withMessage('La date de fin doit être une date valide au format ISO 8601')
                .toDate()
                .custom((value, { req }) => {
                        if (!req.body.startDate) return true;
                        return new Date(value) > new Date(req.body.startDate);
                })
                .withMessage('La date de fin doit être postérieure à la date de début')
];

/**
 * Validation des champs nécessaires à la mise à jour d'une réservation
 * 
 * @param {Array} updateReservationValidation
 * @returns {void}
 */
const updateReservationValidation = [
        body('clientName').trim()
                .optional()
                .isLength({ min: 2, max: 100 }).withMessage('Le nom du client doit contenir entre 2 et 100 caractères'),
        body('boatName').trim()
                .optional()
                .isLength({ min: 2, max: 100 }).withMessage('Le nom du bateau doit contenir entre 2 et 100 caractères'),
        body('startDate')
                .optional()
                .isISO8601().withMessage('La date de début doit être une date valide au format ISO 8601')
                .toDate(),
        body('endDate')
                .optional()
                .isISO8601().withMessage('La date de fin doit être une date valide au format ISO 8601')
                .toDate()
];

module.exports = { catwayIdParamValidation, reservationIdParamValidation, createReservationValidation, updateReservationValidation };