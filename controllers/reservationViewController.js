const Reservation = require('../models/Reservation');


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