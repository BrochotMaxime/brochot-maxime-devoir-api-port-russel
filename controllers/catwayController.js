const Catway = require('../models/catway');

/**
 * Récupère tous les catways
 * 
 * @async
 * @function getAllCatways
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @returns {Promise<void>} - Retourne la liste des catways ou une erreur en cas de problème
 */
exports.getAllCatways = async (req, res) => {
        try {
                const catways = await Catway.find().sort({ catwayNumber: 1 });
                return res.status(200).json(catways);
        } catch (error) {
                console.error('Erreur getAllCatways :', error);
                return res.status(500).json({ error: 'Erreur serveur' });
        }
};

/**
 * Récupère un catway par son ID
 * 
 * @async
 * @function getCatwayById
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @returns {Promise<void>} - Retourne le catway trouvé ou une erreur en cas de problème
 */
exports.getCatwayById = async (req, res) => {
        try {
                const catway = await Catway.findOne({
                        catwayNumber: req.params.id
                });

                if (!catway) {
                        return res.status(404).json({ error: 'Catway introuvable' });
                }

                return res.status(200).json(catway);
        } catch (error) {
                console.error('Erreur getCatwayById :', error);
                return res.status(500).json({ error: 'Erreur serveur' });
        }
};

/**
 * Crée un nouveau catway
 * 
 * @async
 * @function createCatway
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @returns {Promise<void>} - Retourne le catway créé ou une erreur en cas de problème
 */
exports.createCatway = async (req, res) => {
        try {
                const { catwayNumber, catwayType, catwayState } = req.body;

                const existingCatway = await Catway.findOne({
                        catwayNumber: Number(catwayNumber)
                });

                if (existingCatway) {
                        return res.status(409).json({
                                error: 'Un catway avec ce numéro existe déjà'
                        });
                }

                const newCatway = await Catway.create({
                        catwayNumber: Number(catwayNumber),
                        catwayType,
                        catwayState
                });

                return res.status(201).json({
                        message: 'Catway créé avec succès',
                        catway: newCatway
                });
        } catch (error) {
                console.error('Erreur createCatway :', error);
                return res.status(500).json({ error: 'Erreur serveur' });
        }
};

/**
 * Met à jour uniquement l'état d'un catway existant
 * 
 * @async
 * @function updateCatway
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @returns {Promise<void>} - Retourne le catway mis à jour ou une erreur en cas de problème
 */
exports.updateCatway = async (req, res) => {
        try {
                const { catwayState } = req.body;

                const catway = await Catway.findOne({
                        catwayNumber: Number(req.params.id)
                });

                if (!catway) {
                        return res.status(404).json({ error: 'Catway introuvable' });
                }

                catway.catwayState = catwayState;
                await catway.save();

                return res.status(200).json({
                        message: 'Catway mis à jour avec succès',
                        catway
                });
        } catch (error) {
                console.error('Erreur updateCatway :', error);
                return res.status(500).json({ error: 'Erreur serveur' });
        }
};

/**
 * Supprime un catway existant par son numéro
 * 
 * @async
 * @function deleteCatway
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @returns {Promise<void>} - Retourne un message de succès ou une erreur en cas de problème
 */
exports.deleteCatway = async (req, res) => {
        try {
                const deletedCatway = await Catway.findOneAndDelete({
                        catwayNumber: req.params.id
                });

                if (!deletedCatway) {
                        return res.status(404).json({ error: 'Catway introuvable' });
                }

                return res.status(200).json({
                        message: 'Catway supprimé avec succès',
                        catway: deletedCatway
                });
        } catch (error) {
                console.error('Erreur deleteCatway :', error);
                return res.status(500).json({ error: 'Erreur serveur' });
        }
};