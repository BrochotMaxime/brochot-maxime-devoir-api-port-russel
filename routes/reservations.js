/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestion des réservations liées aux catways
 */

/**
 * @swagger
 * /catways/{id}/reservations:
 *   get:
 *     summary: Récupère les réservations d'un catway
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Liste des réservations du catway
 *
 *   post:
 *     summary: Crée une réservation pour un catway
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientName
 *               - boatName
 *               - startDate
 *               - endDate
 *             properties:
 *               clientName:
 *                 type: string
 *                 example: Maxime MAXIME
 *               boatName:
 *                 type: string
 *                 example: France Libre
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-04-20
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-04-25
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Catway introuvable
 *       409:
 *         description: Chevauchement de réservation
 */

/**
 * @swagger
 * /catways/{id}/reservations/{reservationId}:
 *   get:
 *     summary: Récupère une réservation précise
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *         example: 6800abcd1234abcd1234abcd
 *     responses:
 *       200:
 *         description: Réservation trouvée
 *       404:
 *         description: Réservation introuvable
 *
 *   put:
 *     summary: Met à jour une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *         example: 6800abcd1234abcd1234abcd
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientName:
 *                 type: string
 *               boatName:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Réservation mise à jour
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Réservation introuvable
 *       409:
 *         description: Chevauchement de réservation
 *
 *   delete:
 *     summary: Supprime une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *         example: 6800abcd1234abcd1234abcd
 *     responses:
 *       200:
 *         description: Réservation supprimée
 *       404:
 *         description: Réservation introuvable
 */

const express = require('express');
const router = express.Router({ mergeParams: true });

const reservationController = require('../controllers/reservationController');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { handleValidationErrors } = require('../middlewares/validationMiddleware');
const { catwayIdParamValidation, reservationIdParamValidation, createReservationValidation, updateReservationValidation } = require('../middlewares/reservationValidation');

router.get('/', isAuthenticated, catwayIdParamValidation, handleValidationErrors, reservationController.getReservationsByCatway);
router.get('/:reservationId', isAuthenticated, catwayIdParamValidation, reservationIdParamValidation, handleValidationErrors, reservationController.getReservationById);
router.post('/', isAuthenticated, catwayIdParamValidation, createReservationValidation, handleValidationErrors, reservationController.createReservation);
router.put('/:reservationId', isAuthenticated, catwayIdParamValidation, reservationIdParamValidation, updateReservationValidation, handleValidationErrors, reservationController.updateReservation);
router.delete('/:reservationId', isAuthenticated, catwayIdParamValidation, reservationIdParamValidation, handleValidationErrors, reservationController.deleteReservation);

module.exports = router;