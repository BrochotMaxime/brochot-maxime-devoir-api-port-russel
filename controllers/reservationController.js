const Reservation = require('../models/Reservation');
const Catway = require('../models/Catway');


exports.getReservationsByCatway = async (req, res) => {
        try {
                const catwayNumber = Number(req.params.id);

                const reservations = await Reservation.find({ catwayNumber }).sort({ startDate: 1 });

                return res.status(200).json(reservations);
        } catch (error) {
                console.error('Erreur getReservationsByCatway :', error);
                return res.status(500).json({ error: 'Erreur serveur' });
        }
};


exports.getReservationById = async (req, res) => {
        try {
                const catwayNumber = Number(req.params.id);
                const reservationId = req.params.reservationId;

                const reservation = await Reservation.findOne({
                        _id: reservationId,
                        catwayNumber
                });

                if (!reservation) {
                        return res.status(404).json({ error: 'Réservation introuvable' });
                }

                return res.status(200).json(reservation);
        } catch (error) {
                console.error('Erreur getReservationById :', error);
                return res.status(500).json({ error: 'Erreur serveur' });
        }
};


exports.createReservation = async (req, res) => {
        try {
                const catwayNumber = Number(req.params.id);
                const { clientName, boatName, startDate, endDate } = req.body;

                const catway = await Catway.findOne({ catwayNumber });

                if (!catway) {
                        return res.status(404).json({ error: 'Catway introuvable' });
                }

                const overlappingReservation = await Reservation.findOne({
                        catwayNumber,
                        startDate: { $lt: new Date(endDate) },
                        endDate: { $gt: new Date(startDate) }
                });

                if (overlappingReservation) {
                        return res.status(409).json({
                                error: 'Une réservation existe déjà sur cette période pour ce catway'
                        });
                }

                const newReservation = await Reservation.create({
                        catwayNumber,
                        clientName,
                        boatName,
                        startDate,
                        endDate
                });

                return res.status(201).json({
                        message: 'Réservation créée avec succès',
                        reservation: newReservation
                });
        } catch (error) {
                console.error('Erreur createReservation :', error);
                return res.status(500).json({ error: 'Erreur serveur' });
        }
};


exports.updateReservation = async (req, res) => {
        try {
                const catwayNumber = Number(req.params.id);
                const reservationId = req.params.reservationId;
                const { clientName, boatName, startDate, endDate } = req.body;

                if (!clientName && !boatName && !startDate && !endDate) {
                        return res.status(400).json({ error: 'Aucune donnée à mettre à jour' });
                }

                const reservation = await Reservation.findOne({
                        _id: reservationId,
                        catwayNumber
                });

                if (!reservation) {
                        return res.status(404).json({ error: 'Réservation introuvable' });
                }

                let finalStartDate = reservation.startDate;
                let finalEndDate = reservation.endDate;

                if (startDate) {
                        finalStartDate = new Date(startDate);
                }

                if (endDate) {
                        finalEndDate = new Date(endDate);
                }
                
                if (finalStartDate >= finalEndDate) {
                        return res.status(400).json({ error: 'La date de fin doit être postérieure à la date de début' });
                }

                const overlappingReservation = await Reservation.findOne({
                        _id: { $ne: reservationId },
                        catwayNumber,
                        startDate: { $lt: finalEndDate },
                        endDate: { $gt: finalStartDate }
                });

                if (overlappingReservation) {
                        return res.status(409).json({
                                error: 'Une réservation existe déjà sur cette période pour ce catway'
                        });
                }

                if (clientName) reservation.clientName = clientName;
                if (boatName) reservation.boatName = boatName;
                if (startDate) reservation.startDate = startDate;
                if (endDate) reservation.endDate = endDate;

                await reservation.save();

                return res.status(200).json({
                        message: 'Réservation mise à jour avec succès',
                        reservation
                });
        } catch (error) {
                console.error('Erreur updateReservation :', error);
                return res.status(500).json({ error: 'Erreur serveur' });
        }
};


exports.deleteReservation = async (req, res) => {
        try {
                const catwayNumber = Number(req.params.id);
                const reservationId = req.params.reservationId;

                const deletedReservation = await Reservation.findOneAndDelete({
                        _id: reservationId,
                        catwayNumber
                });

                if (!deletedReservation) {
                        return res.status(404).json({ error: 'Réservation introuvable' });
                }

                return res.status(200).json({
                        message: 'Réservation supprimée avec succès',
                        reservation: deletedReservation
                });
        } catch (error) {
                console.error('Erreur deleteReservation :', error);
                return res.status(500).json({ error: 'Erreur serveur' });
        }
};