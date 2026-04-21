const Reservation = require('../models/reservation');
const Catway = require('../models/catway');

/**
 * Récupère la page de liste des réservations
 * 
 * @async
 * @function getReservationsPage
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @returns {Promise<void>} - Retourne la page de liste des réservations ou une erreur en cas de problème
 */
exports.getReservationsPage = async (req, res) => {
        try {
                const reservations = await Reservation.find().sort({ startDate: 1 });

                res.render('reservations/index', {
                        title: 'Liste des réservations',
                        reservations
                });
        } catch (error) {
                console.error('Erreur getReservationsPage :', error);
                res.status(500).send('Erreur lors du chargement des réservations');
        }
};

/**
 * Récupère la page de détail d'une réservation
 * 
 * @async
 * @function getReservationDetailPage
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @returns {Promise<void>} - Retourne la page de détail de la réservation ou une erreur en cas de problème
 */
exports.getReservationDetailPage = async (req, res) => {
        try {
                const reservation = await Reservation.findById(req.params.id);

                if (!reservation) {
                        return res.status(404).send('Réservation introuvable');
                }

                res.render('reservations/show', {
                        title: `Détail de la réservation`,
                        reservation
                });
        } catch (error) {
                console.error('Erreur getReservationDetailPage :', error);
                res.status(500).send('Erreur lors du chargement du détail de la réservation');
        }
};

/**
 * Récupère la page de création d'une réservation
 * 
 * @async
 * @function getNewReservationPage
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @returns {Promise<void>} - Retourne la page de création de la réservation ou une erreur en cas de problème
 */
exports.getNewReservationPage = async (req, res) => {
        try {
                const catways = await Catway.find().sort({ catwayNumber: 1 });

                res.render('reservations/new', {
                        title: 'Créer une réservation',
                        catways
                });
        } catch (error) {
                console.error('Erreur getNewReservationPage :', error);
                res.status(500).send('Erreur lors du chargement du formulaire');
        }
};

/**
 * Crée une réservation
 * 
 * @async
 * @function createReservation
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @returns {Promise<void>} - Retourne la réservation créée ou une erreur en cas de problème
 */
exports.createReservation = async (req, res) => {
        try {
                const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;

                if (!catwayNumber || !clientName || !boatName || !startDate || !endDate) {
                        return res.status(400).send('Tous les champs sont requis');
                }

                const catway = await Catway.findOne({ catwayNumber: Number(catwayNumber) });

                if (!catway) {
                        return res.status(404).send('Catway introuvable');
                }

                if (new Date(endDate) <= new Date(startDate)) {
                        return res.status(400).send('La date de fin doit être postérieure à la date de début');
                }

                const overlappingReservation = await Reservation.findOne({
                        catwayNumber: Number(catwayNumber),
                        startDate: { $lt: new Date(endDate) },
                        endDate: { $gt: new Date(startDate) }
                });

                if (overlappingReservation) {
                        return res.status(409).send('Une réservation existe déjà sur cette période pour ce catway');
                }

                await Reservation.create({
                        catwayNumber: Number(catwayNumber),
                        clientName,
                        boatName,
                        startDate,
                        endDate
                });

                res.redirect('/reservations-page');
        } catch (error) {
                console.error('Erreur createReservation :', error);
                res.status(500).send('Erreur lors de la création de la réservation');
        }
};

/**
 * Récupère la page de modification d'une réservation
 * 
 * @async
 * @function getEditReservationPage
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @returns {Promise<void>} - Retourne la page de modification de la réservation ou une erreur en cas de problème
 */
exports.getEditReservationPage = async (req, res) => {
        try {
                const reservation = await Reservation.findById(req.params.id);
                const catways = await Catway.find().sort({ catwayNumber: 1 });

                if (!reservation) {
                        return res.status(404).send('Réservation introuvable');
                }

                res.render('reservations/edit', {
                        title: 'Modifier la réservation',
                        reservation,
                        catways
                });
        } catch (error) {
                console.error('Erreur getEditReservationPage :', error);
                res.status(500).send('Erreur lors du chargement du formulaire de modification');
        }
};

/**
 * Met à jour une réservation
 * 
 * @async
 * @function updateReservation
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @returns {Promise<void>} - Retourne la réservation mise à jour ou une erreur en cas de problème
 */
exports.updateReservation = async (req, res) => {
        try {
                const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;

                if (!catwayNumber || !clientName || !boatName || !startDate || !endDate) {
                        return res.status(400).send('Tous les champs sont requis');
                }

                const reservation = await Reservation.findById(req.params.id);

                if (!reservation) {
                        return res.status(404).send('Réservation introuvable');
                }

                const catway = await Catway.findOne({ catwayNumber: Number(catwayNumber) });

                if (!catway) {
                        return res.status(404).send('Catway introuvable');
                }

                if (new Date(endDate) <= new Date(startDate)) {
                        return res.status(400).send('La date de fin doit être postérieure à la date de début');
                }

                const overlappingReservation = await Reservation.findOne({
                        _id: { $ne: req.params.id },
                        catwayNumber: Number(catwayNumber),
                        startDate: { $lt: new Date(endDate) },
                        endDate: { $gt: new Date(startDate) }
                });

                if (overlappingReservation) {
                        return res.status(409).send('Une réservation existe déjà sur cette période pour ce catway');
                }

                reservation.catwayNumber = Number(catwayNumber);
                reservation.clientName = clientName;
                reservation.boatName = boatName;
                reservation.startDate = startDate;
                reservation.endDate = endDate;

                await reservation.save();

                res.redirect(`/reservations-page/${reservation._id}`);
        } catch (error) {
                console.error('Erreur updateReservation :', error);
                res.status(500).send('Erreur lors de la mise à jour de la réservation');
        }
};

/**
 * Supprime une réservation
 * 
 * @async
 * @function deleteReservation
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @returns {Promise<void>} - Retourne un message de succès ou une erreur en cas de problème
 */
exports.deleteReservation = async (req, res) => {
        try {
                const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);

                if (!deletedReservation) {
                        return res.status(404).send('Réservation introuvable');
                }

                res.redirect('/reservations-page');
        } catch (error) {
                console.error('Erreur deleteReservation :', error);
                res.status(500).send('Erreur lors de la suppression de la réservation');
        }
};