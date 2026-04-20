const { validationResult } = require('express-validator');

/**
 * Gère les erreurs de validation
 * 
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @param {*} next - Fonction pour passer au middleware suivant
 * @returns {void}
 */
const handleValidationErrors = (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
                return res.status(400).json({
                        errors: errors.array().map(error => ({
                                field: error.path,
                                message: error.msg
                        }))
                });
        }

        next();
};

module.exports = { handleValidationErrors };