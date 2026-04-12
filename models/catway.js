const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Catway = new Schema({
    catwayNumber: {
      type: Number,
      required: [true, "Le numéro du catway est requis"],
      unique: true,
      min: [1, "Le numéro du catway doit être supérieur à 0"],
      validate: {
        validator: Number.isInteger,
        message: "Le numéro du catway doit être un entier"
      }
    },
    catwayType: {
      type: String,
      required: [true, "Le type du catway est requis"],
      enum: {
        values: ['long', 'short'],
        message: "Le type du catway doit être \"long\" ou \"short\""
      },
      trim: true,
      lowercase: true
    },
    catwayState: {
      type: String,
      required: [true, "L'état du catway est requis"],
      trim: true,
      minlength: [3, "L'état du catway doit contenir au moins 3 caractères"],
      maxlength: [500, "L'état du catway ne doit pas dépasser 500 caractères"]
    }
  }, {
    timestamps: true
  }
);

module.exports = mongoose.model('Catway', Catway);