const Catway = require('../models/Catway');

/**
 * Affiche la page listant les catways
 * 
 * @async
 * @function getCatwaysPage
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @returns {Promise<void>} - Retourne la page avec la liste des catways ou une erreur en cas de problème
 */
exports.getCatwaysPage = async (req, res) => {
        try {
                const catways = await Catway.find().sort({ catwayNumber: 1 });

                res.render('catways/index', {
                        title: 'Liste des catways',
                        catways
                });
        } catch (error) {
                console.error('Erreur getCatwaysPage :', error);
                res.status(500).send('Erreur lors du chargement des catways');
        }
};

/**
 * Affiche la page de détail d'un catway
 * 
 * @async
 * @function getCatwayDetailPage
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @returns {Promise<void>} - Retourne la page avec les détails du catway ou une erreur en cas de problème
 */
exports.getCatwayDetailPage = async (req, res) => {
        try {
                const catway = await Catway.findOne({
                        catwayNumber: Number(req.params.id)
                });

                if (!catway) {
                        return res.status(404).send('Catway introuvable');
                }

                res.render('catways/show', {
                        title: `Détail du catway ${catway.catwayNumber}`,
                        catway
                });
        } catch (error) {
                console.error('Erreur getCatwayDetailPage :', error);
                res.status(500).send('Erreur lors du chargement du détail du catway');
        }
};

/**
 * Affiche la page de création d'un nouveau catway
 * 
 * @function getNewCatwayPage
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @returns {void} - Retourne la page de création d'un catway
 */
exports.getNewCatwayPage = (req, res) => {
        res.render('catways/new', {
                title: 'Créer un catway'
        });
};

/**
 * Crée un nouveau catway à partir des données du formulaire
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

                if (!catwayNumber || !catwayType || !catwayState) {
                        return res.status(400).send('Tous les champs sont requis');
                }

                const existingCatway = await Catway.findOne({
                        catwayNumber: Number(catwayNumber)
                });

                if (existingCatway) {
                        return res.status(409).send('Un catway avec ce numéro existe déjà');
                }

                await Catway.create({
                        catwayNumber: Number(catwayNumber),
                        catwayType,
                        catwayState
                });

                res.redirect('/catways-page');
        } catch (error) {
                console.error('Erreur createCatway :', error);
                res.status(500).send('Erreur lors de la création du catway');
        }
};

/**
 * Affiche la page de modification d'un catway
 * 
 * @async
 * @function getEditCatwayPage
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @returns {Promise<void>} - Retourne la page de modification du catway ou une erreur en cas de problème
 */
exports.getEditCatwayPage = async (req, res) => {
        try {
                const catway = await Catway.findOne({
                        catwayNumber: Number(req.params.id)
                });

                if (!catway) {
                        return res.status(404).send('Catway introuvable');
                }

                res.render('catways/edit', {
                        title: `Modifier le catway ${catway.catwayNumber}`,
                        catway
                });
        } catch (error) {
                console.error('Erreur getEditCatwayPage :', error);
                res.status(500).send('Erreur lors du chargement du formulaire de modification');
        }
};

/**
 * Met à jour un catway
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

                if (!catwayState) {
                        return res.status(400).send("L'état du catway est requis");
                }

                const catway = await Catway.findOne({
                        catwayNumber: Number(req.params.id)
                });

                if (!catway) {
                        return res.status(404).send('Catway introuvable');
                }

                catway.catwayState = catwayState;
                await catway.save();

                res.redirect(`/catways-page/${catway.catwayNumber}`);
        } catch (error) {
                console.error('Erreur updateCatway :', error);
                res.status(500).send('Erreur lors de la mise à jour du catway');
        }
};

/**
 * Supprime un catway
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
                        catwayNumber: Number(req.params.id)
                });

                if (!deletedCatway) {
                        return res.status(404).send('Catway introuvable');
                }

                res.redirect('/catways-page');
        } catch (error) {
                console.error('Erreur deleteCatway :', error);
                res.status(500).send('Erreur lors de la suppression du catway');
        }
};