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