require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const connectDB = require('../config/db');
const User = require('../models/user');


/**
 * Crée un utilisateur administrateur si celui-ci n'existe pas déjà dans la base de données.
 * 
 * @async
 * @function createAdmin
 * @returns {Promise<void>} - Retourne une promesse qui se résout lorsque l'utilisateur admin est créé ou existe déjà, ou rejette en cas d'erreur
 */
const createAdmin = async () => {
        try {
                await connectDB();

                const existingUser = await User.findOne({ email: 'admin@port-russell.com' });

                if (existingUser) {
                        console.log("L'utilisateur admin existe déjà.");
                        await mongoose.connection.close();
                        return;
                }

                const hashedPassword = await bcrypt.hash('Admin1234!', 10);

                const admin = new User({
                        username: 'admin',
                        email: 'admin@port-russell.com',
                        password: hashedPassword
                });

                await admin.save();

                console.log('Utilisateur administrateur créé avec succès.');
                console.log('Email : admin@port-russell.com');
                console.log('Mot de passe : Admin1234!');

                await mongoose.connection.close();
                return;

        } catch (error) {
                console.error("Erreur lors de la création de l'utilisateur admin :", error);
                await mongoose.connection.close();
                throw error;
        }
};

createAdmin();