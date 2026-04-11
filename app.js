const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cors = require('cors');

const app = express();

/* Configuration du moteur de modèles EJS */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Middlewares */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

/* Route de test */
app.get('/', (req, res) => {
  res.render('home', {
        title: 'Bienvenue sur l\'API de Port Russel'
  });
});

module.exports = app;