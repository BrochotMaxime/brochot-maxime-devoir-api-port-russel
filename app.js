const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;

const authRoutes = require('./routes/auth');
const { isAuthenticated } = require('./middlewares/authMiddleware');
const userRoutes = require('./routes/users');
const catwayRoutes = require('./routes/catways');
const catwayViewRoutes = require('./routes/catwayViews');
const Reservation = require('./models/reservation');

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
        res.locals.error = null;
        res.locals.success = null;
        next();
});

/* Routes */
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/', catwayViewRoutes);
app.use('/catways', catwayRoutes);

/* Routes de test */
app.get('/', (req, res) => {
        res.render('home', {
                title: 'Bienvenue sur l\'API de Port Russel',
                error: null,
                success: null
        });
});

app.get('/private-test', isAuthenticated, (req, res) => {
        res.send('Accès autorisé à la zone privée');
});

/* Route pour la tableau de bord */
app.get('/dashboard',isAuthenticated, async (req, res) => {
        try {
                const today = new Date();
                const currentReservations = await Reservation.find({
                        startDate: { $lte: today },
                        endDate: { $gte: today }
                });
                res.render('dashboard', {
                        title: 'Dashboard',
                        currentReservations: currentReservations
                });
        } catch (error) {
                console.error('Erreur lors de la récupération des réservations :', error);
                res.status(500).render('error', { title: 'Erreur', message: 'Une erreur est survenue lors de la récupération des réservations.' });
                return;
        }
        
});

module.exports = app;