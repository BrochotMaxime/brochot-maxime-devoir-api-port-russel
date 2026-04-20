/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification des utilisateurs
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connecte un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: maxime@port-russell.com
 *               password:
 *                 type: string
 *                 example: Maxime1234!
 *     responses:
 *       302:
 *         description: Redirection vers le dashboard en cas de succès
 *       400:
 *         description: Champs manquants
 *       401:
 *         description: Identifiants invalides
 */

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Déconnecte un utilisateur
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirection vers l'accueil
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;