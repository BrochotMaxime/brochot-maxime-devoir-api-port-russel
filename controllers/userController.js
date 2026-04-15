const bcrypt = require('bcrypt');
const User = require('../models/user');


exports.getAllUsers = async (req, res) => {
        try {
                const users = await User.find().select('-password').sort({ username: 1 });
                return res.status(200).json(users);
        } catch (error) {
                console.error('Erreur getAllUsers :', error);
                return res.status(500).json({ error: 'Erreur serveur' });
        }
};


exports.getUserByEmail = async (req, res) => {
        try {
                const user = await User.findOne({
                        email: req.params.email.toLowerCase()
                }).select('-password');

                if (!user) {
                        return res.status(404).json({ error: 'Utilisateur introuvable' });
                }

                return res.status(200).json(user);
        } catch (error) {
                console.error('Erreur getUserByEmail :', error);
                return res.status(500).json({ error: 'Erreur serveur' });
        }
};


exports.createUser = async (req, res) => {
        try {
                const { username, email, password } = req.body;

                if (!username || !email || !password) {
                        return res.status(400).json({ error: 'username, email et password sont requis' });
                }

                const existingUser = await User.findOne({ email: email.toLowerCase() });

                if (existingUser) {
                        return res.status(409).json({ error: 'Un utilisateur avec cet email existe déjà' });
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                const newUser = await User.create({
                        username,
                        email: email.toLowerCase(),
                        password: hashedPassword
                });

                return res.status(201).json({
                        message: 'Utilisateur créé avec succès',
                        user: {
                                _id: newUser._id,
                                username: newUser.username,
                                email: newUser.email,
                        }
                });
        } catch (error) {
                console.error('Erreur createUser :', error);
                return res.status(500).json({ error: 'Erreur serveur' });
        }
};


exports.updateUser = async (req, res) => {
        try {
                const { username, email, password } = req.body;

                if (!username && !email && !password) {
                        return res.status(400).json({ error: 'Aucune donnée à mettre à jour' });
                }

                const currentEmail = req.params.email.toLowerCase();

                const user = await User.findOne({ email: currentEmail }).select('+password');

                if (!user) {
                        return res.status(404).json({ error: 'Utilisateur introuvable' });
                }

                if (username) {
                        user.username = username;
                }

                if (email) {
                        user.email = email.toLowerCase();
                }

                if (password) {
                        user.password = await bcrypt.hash(password, 10);
                }

                await user.save();

                return res.status(200).json({
                        message: 'Utilisateur mis à jour avec succès',
                        user: {
                                _id: user._id,
                                username: user.username,
                                email: user.email,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt
                        }
                });
        } catch (error) {
                console.error('Erreur updateUser :', error);

                if (error.code === 11000) {
                        return res.status(409).json({ error: 'Cet email est déjà utilisé' });
                }

                return res.status(500).json({ error: 'Erreur serveur' });
        }
};


exports.deleteUser = async (req, res) => {
        try {
                const deletedUser = await User.findOneAndDelete({
                        email: req.params.email.toLowerCase()
                }).select('-password');

                if (!deletedUser) {
                        return res.status(404).json({ error: 'Utilisateur introuvable' });
                }

                return res.status(200).json({
                        message: 'Utilisateur supprimé avec succès',
                        user: deletedUser
                });
        } catch (error) {
                console.error('Erreur deleteUser :', error);
                return res.status(500).json({ error: 'Erreur serveur' });
        }
};