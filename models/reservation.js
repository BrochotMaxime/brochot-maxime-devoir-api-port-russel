const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schéma pour les réservations
 * 
 * @typedef {Object} Reservation
 * @property {number} catwayNumber - Le numéro du catway réservé (entier positif)
 * @property {string} clientName - Le nom du client (entre 2 et 100 caractères)
 * @property {string} boatName - Le nom du bateau (entre 2 et 100 caractères)
 * @property {Date} startDate - La date de début de la réservation
 * @property {Date} endDate - La date de fin de la réservation (doit être postérieure à la date de début)
 */
const Reservation = new Schema({
        catwayNumber: {
                type: Number,
                required: [true, 'Le numéro du catway est requis'],
                min: [1, 'Le numéro du catway doit être supérieur à 0'],
                validate: {
                        validator: Number.isInteger,
                        message: 'Le numéro du catway doit être un entier'
                }
        },
        clientName: {
                type: String,
                required: [true, 'Le nom du client est requis'],
                trim: true,
                minlength: [2, 'Le nom du client doit contenir au moins 2 caractères'],
                maxlength: [100, 'Le nom du client ne doit pas dépasser 100 caractères']
        },
        boatName: {
                type: String,
                required: [true, 'Le nom du bateau est requis'],
                trim: true,
                minlength: [2, 'Le nom du bateau doit contenir au moins 2 caractères'],
                maxlength: [100, 'Le nom du bateau ne doit pas dépasser 100 caractères']
        },
        startDate: {
                type: Date,
                required: [true, 'La date de début est requise']
        },
        endDate: {
                type: Date,
                required: [true, 'La date de fin est requise'],
                validate: {
                        validator: function (value) {
                                return this.startDate && value > this.startDate;
                        },
                message: 'La date de fin doit être postérieure à la date de début'
                }
        }
        }, {
                timestamps: true
        }
);

module.exports = mongoose.models.Reservation || mongoose.model('Reservation', Reservation);