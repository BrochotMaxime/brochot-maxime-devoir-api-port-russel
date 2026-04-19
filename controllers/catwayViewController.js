const Catway = require('../models/Catway');


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


exports.getNewCatwayPage = (req, res) => {
        res.render('catways/new', {
                title: 'Créer un catway'
        });
};


exports.createCatwayFromView = async (req, res) => {
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
                console.error('Erreur createCatwayFromView :', error);
                res.status(500).send('Erreur lors de la création du catway');
        }
};


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


exports.updateCatwayFromView = async (req, res) => {
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
                console.error('Erreur updateCatwayFromView :', error);
                res.status(500).send('Erreur lors de la mise à jour du catway');
        }
};


exports.deleteCatwayFromView = async (req, res) => {
        try {
                const deletedCatway = await Catway.findOneAndDelete({
                        catwayNumber: Number(req.params.id)
                });

                if (!deletedCatway) {
                        return res.status(404).send('Catway introuvable');
                }

                res.redirect('/catways-page');
        } catch (error) {
                console.error('Erreur deleteCatwayFromView :', error);
                res.status(500).send('Erreur lors de la suppression du catway');
        }
};