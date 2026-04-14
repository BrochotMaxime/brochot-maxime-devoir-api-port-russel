const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;

const authRoutes = require('./routes/auth');

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

/* Configuration de la session avec MongoDB */
app.use(session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
                mongoUrl: process.env.URL_MONGO
        }),
        cookie: {
                maxAge: 1000 * 60 * 60 * 24 // 1 jour
        }
        })
);

/* Middleware pour rendre l'utilisateur disponible dans toutes les vues */
app.use((req, res, next) => {
        res.locals.user = req.session.user || null;
        res.locals.currentDate = new Date().toLocaleDateString('fr-FR');
        next();
});

/* Routes */
app.use('/', authRoutes);

/* Route de test */
app.get('/', (req, res) => {
        res.render('home', {
                title: 'Bienvenue sur l\'API de Port Russel',
                error: null
        });
});

/* Route pour la tableau de bord */
app.get('/dashboard', (req, res) => {
        if (!req.session.user) {
                return res.redirect('/');
        }

        res.render('dashboard', {
                title: 'Dashboard'
        });
});

module.exports = app;