const mongoose = require('mongoose');

/**
 * Fonction pour connecter à la base de données MongoDB
 * 
 * @async
 * @function connectDB
 * @returns {Promise<void>} - Retourne une promesse qui se résout lorsque la connexion est établie ou rejette en cas d'erreur
 */
const connectDB = async () => {
        try {
                await mongoose.connect(process.env.URL_MONGO);
                console.log('Connecté à MongoDB');
        } catch (error) {
                console.error('Erreur de connexion à MongoDB:', error);
                throw error;
        }
};

module.exports = connectDB;