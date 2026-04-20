/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupère tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: maxime
 *               email:
 *                 type: string
 *                 example: maxime@port-russell.com
 *               password:
 *                 type: string
 *                 example: Maxime1234!
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Données invalides
 *       409:
 *         description: Email déjà utilisé
 */

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Récupère un utilisateur par email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: maxime@port-russell.com
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur introuvable
 *
 *   put:
 *     summary: Met à jour un utilisateur par email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: maxime@port-russell.com
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: maxime
 *               email:
 *                 type: string
 *                 example: maxime@port-russell.com
 *               password:
 *                 type: string
 *                 example: Maxime1234!
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *       404:
 *         description: Utilisateur introuvable
 *
 *   delete:
 *     summary: Supprime un utilisateur par email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: maxime@port-russell.com
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       404:
 *         description: Utilisateur introuvable
 */

const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { handleValidationErrors } = require('../middlewares/validationMiddleware');
const { createUserValidation, updateUserValidation, emailParamValidation } = require('../middlewares/userValidation');

router.get('/', isAuthenticated, userController.getAllUsers);
router.get('/:email', isAuthenticated, emailParamValidation, handleValidationErrors, userController.getUserByEmail);
router.post('/', isAuthenticated, createUserValidation, handleValidationErrors, userController.createUser);
router.put('/:email', isAuthenticated, emailParamValidation, updateUserValidation, handleValidationErrors, userController.updateUser);
router.delete('/:email', isAuthenticated, emailParamValidation, handleValidationErrors, userController.deleteUser);

module.exports = router;