const mongoose = require('mongoose');

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