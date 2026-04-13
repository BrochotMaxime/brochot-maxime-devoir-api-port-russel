const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;

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

/* Route de test */
app.get('/', (req, res) => {
        res.render('home', {
                title: 'Bienvenue sur l\'API de Port Russel'
        });
});

/* Route test pour créer une session */
app.get('/create-session', (req, res) => {
        req.session.user = {
                username: 'admin',
                email: 'admin@port-russell.com'
        };

        res.send('Session créée');
});

/* Route test pour vérifier la session */
app.get('/check-session', (req, res) => {
        if (req.session.user) {
                res.json({ username: req.session.user.username, email: req.session.user.email });
        } else {
                res.status(401).json({ error: 'Utilisateur non connecté' });
        }
});

module.exports = app;