/**
 * @swagger
 * tags:
 *   name: Catways
 *   description: Gestion des catways
 */

/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Récupère tous les catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Liste des catways
 *
 *   post:
 *     summary: Crée un nouveau catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - catwayNumber
 *               - catwayType
 *               - catwayState
 *             properties:
 *               catwayNumber:
 *                 type: integer
 *                 example: 10
 *               catwayType:
 *                 type: string
 *                 example: long
 *               catwayState:
 *                 type: string
 *                 example: Très bon état
 *     responses:
 *       201:
 *         description: Catway créé avec succès
 *       400:
 *         description: Données invalides
 *       409:
 *         description: Numéro déjà utilisé
 */

/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     summary: Récupère un catway par son numéro
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Catway trouvé
 *       404:
 *         description: Catway introuvable
 *
 *   put:
 *     summary: Met à jour l'état d'un catway
 *     tags: [Catways]
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
 *               - catwayState
 *             properties:
 *               catwayState:
 *                 type: string
 *                 example: État mis à jour
 *     responses:
 *       200:
 *         description: Catway mis à jour
 *       404:
 *         description: Catway introuvable
 *
 *   delete:
 *     summary: Supprime un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Catway supprimé
 *       404:
 *         description: Catway introuvable
 */

const express = require('express');
const router = express.Router();

const catwayController = require('../controllers/catwayController');
const reservationRoutes = require('./reservations');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { handleValidationErrors } = require('../middlewares/validationMiddleware');
const { catwayIdValidation, createCatwayValidation, updateCatwayValidation } = require('../middlewares/catwayValidation');

router.get('/', isAuthenticated, catwayController.getAllCatways);
router.get('/:id', isAuthenticated, catwayIdValidation, handleValidationErrors, catwayController.getCatwayById);
router.post('/', isAuthenticated, createCatwayValidation, handleValidationErrors, catwayController.createCatway);
router.put('/:id', isAuthenticated, catwayIdValidation, updateCatwayValidation, handleValidationErrors, catwayController.updateCatway);
router.delete('/:id', isAuthenticated, catwayIdValidation, handleValidationErrors, catwayController.deleteCatway);

router.use('/:id/reservations', reservationRoutes);

module.exports = router;