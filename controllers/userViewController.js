const User = require('../models/user');
const bcrypt = require('bcrypt');


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


exports.getNewUserPage = (req, res) => {
        res.render('users/new', {
                title: 'Créer un utilisateur'
        });
};


exports.createUserFromView = async (req, res) => {
        try {
                const { username, email, password } = req.body;

                if (!username || !email || !password) {
                        return res.status(400).send("Tous les champs sont requis");
                }

                const normalizedEmail = email.toLowerCase();

                const existingUser = await User.findOne({ email: normalizedEmail });

                if (existingUser) {
                        return res.status(409).send("Un utilisateur avec cet email existe déjà");
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                await User.create({
                        username,
                        email: normalizedEmail,
                        password: hashedPassword
                });

                res.redirect('/users-page');
        } catch (error) {
                console.error('Erreur createUserFromView :', error);
                res.status(500).send("Erreur lors de la création de l'utilisateur");
        }
};


exports.getEditUserPage = async (req, res) => {
        try {
                const email = req.params.email.toLowerCase();

                const user = await User.findOne({ email }).select('-password');

                if (!user) {
                        return res.status(404).send('Utilisateur introuvable');
                }

                res.render('users/edit', {
                        title: `Modifier ${user.username}`,
                        viewedUser: user
                });
        } catch (error) {
                console.error('Erreur getEditUserPage :', error);
                res.status(500).send("Erreur lors du chargement du formulaire de modification");
        }
};


exports.updateUserFromView = async (req, res) => {
        try {
                const currentEmail = req.params.email.toLowerCase();
                const { username, email, password } = req.body;

                if (!username || !email) {
                        return res.status(400).send("Le nom d'utilisateur et l'email sont requis");
                }

                const user = await User.findOne({ email: currentEmail }).select('+password');

                if (!user) {
                        return res.status(404).send('Utilisateur introuvable');
                }

                const normalizedEmail = email.toLowerCase();

                if (normalizedEmail !== currentEmail) {
                        const existingUser = await User.findOne({ email: normalizedEmail });

                        if (existingUser) {
                                return res.status(409).send("Cet email est déjà utilisé");
                        }
                }

                user.username = username;
                user.email = normalizedEmail;

                if (password && password.trim() !== '') {
                        user.password = await bcrypt.hash(password, 10);
                }

                await user.save();

                res.redirect(`/users-page/${user.email}`);
        } catch (error) {
                console.error('Erreur updateUserFromView :', error);
                res.status(500).send("Erreur lors de la mise à jour de l'utilisateur");
        }
};


exports.deleteUserFromView = async (req, res) => {
        try {
                const email = req.params.email.toLowerCase();

                const deletedUser = await User.findOneAndDelete({ email });

                if (!deletedUser) {
                        return res.status(404).send('Utilisateur introuvable');
                }

                res.redirect('/users-page');
        } catch (error) {
                console.error('Erreur deleteUserFromView :', error);
                res.status(500).send("Erreur lors de la suppression de l'utilisateur");
        }
};