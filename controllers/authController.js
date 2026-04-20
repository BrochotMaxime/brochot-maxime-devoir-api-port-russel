const bcrypt = require('bcrypt');
const User = require('../models/user');

/**
 * Connecte un utilisateur en vérifiant ses informations d'identification et en créant une session.
 * 
 * @async
 * @function login
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @returns {Promise<void>} - Redirige vers le tableau de bord si la connexion est réussie, sinon rend la page d'accueil avec un message d'erreur
 */
exports.login = async (req, res) => {
        try {
                const { email, password } = req.body;

                if (!email || !password) {
                        return res.status(400).render('home', {
                                title: "Bienvenue sur l'API de Port Russel",
                                error: "Veuillez renseigner l'email et le mot de passe."
                        });
                }

                const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

                if (!user) {
                        return res.status(401).render('home', {
                                title: "Bienvenue sur l'API de Port Russel",
                                error: "Email ou mot de passe incorrect."
                        });
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                        return res.status(401).render('home', {
                                title: "Bienvenue sur l'API de Port Russel",
                                error: "Email ou mot de passe incorrect."
                        });
                }

                req.session.user = {
                        id: user._id,
                        username: user.username,
                        email: user.email
                };

                console.log('Login réussi, redirection vers /dashboard');
                return res.redirect('/dashboard');

        } catch (error) {
                console.error("Erreur lors de la connexion :", error);
                return res.status(500).render('home', {
                        title: "Bienvenue sur l'API de Port Russel",
                        error: "Une erreur est survenue lors de la connexion."
                });
        }
};

/**
 * Déconnecte un utilisateur et supprime sa session.
 * 
 * @function logout
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @returns {void} - Redirige vers la page d'accueil après la déconnexion ou affiche une erreur en cas de problème
 */
exports.logout = (req, res) => {
        req.session.destroy((error) => {
                if (error) {
                        console.error("Erreur lors de la déconnexion :", error);
                        return res.status(500).send("Erreur lors de la déconnexion");
                }

                res.clearCookie('connect.sid');
                return res.redirect('/');
        });
};