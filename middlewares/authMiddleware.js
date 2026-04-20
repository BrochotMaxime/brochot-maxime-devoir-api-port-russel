/**
 * Middleware pour vérifier si l'utilisateur est authentifié
 * 
 * @param {*} req - Objet de requête Express
 * @param {*} res - Objet de réponse Express
 * @param {*} next - Fonction pour passer au middleware suivant
 * @returns {void} - Redirige vers la page d'accueil si l'utilisateur n'est pas authentifié, sinon passe au middleware suivant
 */
const isAuthenticated = (req, res, next) => {
        if (!req.session.user) {
                return res.redirect('/');
        }

        next();
};

module.exports = { isAuthenticated };