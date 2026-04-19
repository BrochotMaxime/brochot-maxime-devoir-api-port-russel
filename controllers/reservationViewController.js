const Reservation = require('../models/Reservation');
const Catway = require('../models/Catway');


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


exports.createReservationFromView = async (req, res) => {
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
                console.error('Erreur createReservationFromView :', error);
                res.status(500).send('Erreur lors de la création de la réservation');
        }
};


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


exports.updateReservationFromView = async (req, res) => {
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
                console.error('Erreur updateReservationFromView :', error);
                res.status(500).send('Erreur lors de la mise à jour de la réservation');
        }
};


exports.deleteReservationFromView = async (req, res) => {
        try {
                const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);

                if (!deletedReservation) {
                        return res.status(404).send('Réservation introuvable');
                }

                res.redirect('/reservations-page');
        } catch (error) {
                console.error('Erreur deleteReservationFromView :', error);
                res.status(500).send('Erreur lors de la suppression de la réservation');
        }
};