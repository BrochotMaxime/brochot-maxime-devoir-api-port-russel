const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
        username: {
                type: String,
                required: [true, "Le nom d'utilisateur est requis"],
                trim: true,
                minlength: [3, "Le nom utilisateur doit contenir au moins 3 caractères"],
                maxlength: [50, "Le nom utilisateur ne doit pas dépasser 50 caractères"]
        },
        email: {
                type: String,
                required: [true, "L'adresse e-mail est requise"],
                unique: true,
                trim: true,
                lowercase: true,
                match: [/^\S+@\S+\.\S+$/, "Adresse e-mail invalide"]
        },
        password: {
                type: String,
                required: [true, "Le mot de passe est requis"],
                minlength: [8, "Le mot de passe doit contenir au moins 8 caractères"]
        }
        }, {
        timestamps: true
        }
);

module.exports = mongoose.model('User', User);