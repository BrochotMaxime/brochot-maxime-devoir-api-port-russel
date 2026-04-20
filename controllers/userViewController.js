const User = require('../models/user');


exports.getUsersPage = async (req, res) => {
        try {
                const users = await User.find().select('-password').sort({ username: 1 });

                res.render('users/index', {
                        title: 'Liste des utilisateurs',
                        users
                });
        } catch (error) {
                console.error('Erreur getUsersPage :', error);
                res.status(500).send('Erreur lors du chargement des utilisateurs');
        }
};


exports.getUserDetailPage = async (req, res) => {
        try {
                const email = req.params.email.toLowerCase();

                const user = await User.findOne({ email }).select('-password');

                if (!user) {
                        return res.status(404).send('Utilisateur introuvable');
                }

                res.render('users/show', {
                        title: `Détail de ${user.username}`,
                        viewedUser: user
                });
        } catch (error) {
                console.error('Erreur getUserDetailPage :', error);
                res.status(500).send("Erreur lors du chargement du détail de l'utilisateur");
        }
};