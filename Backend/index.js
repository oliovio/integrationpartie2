import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes/index.js';
import { errorHandler } from './middleware/error.js';
import { requestLogger } from './middleware/requestLogger.js';
import sequelize from './config/database.js';
import logger from './config/logger.js';

// Configuration des variables d'environnement
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Routes API
app.use('/api', routes);

// Route de santé
app.get('/health', (req, res) => {
    res.json({ 
        status: 'UP',
        timestamp: new Date(),
        environment: process.env.NODE_ENV
    });
});

// Middleware de gestion des erreurs
app.use(errorHandler);

// Port
const PORT = process.env.PORT || 3000;

// Démarrage du serveur
const startServer = async () => {
    try {
        // Vérification de la connexion à la base de données
        await sequelize.authenticate();
        logger.info('Connexion à la base de données établie avec succès.');

        // Synchronisation des modèles avec la base de données
        if (process.env.NODE_ENV !== 'production') {
            await sequelize.sync({ alter: true });
            logger.info('Modèles synchronisés avec la base de données.');
        }

        // Démarrage du serveur
        app.listen(PORT, () => {
            logger.info(`Serveur démarré sur le port ${PORT}`);
            logger.info(`Environment: ${process.env.NODE_ENV}`);
            logger.info(`Base de données: ${process.env.DB_NAME}`);
        });
    } catch (error) {
        logger.error('Erreur lors du démarrage du serveur:', error);
        process.exit(1);
    }
};

// Gestion des erreurs non capturées
process.on('uncaughtException', (error) => {
    logger.error('Erreur non capturée:', error);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    logger.error('Promesse rejetée non gérée:', error);
    process.exit(1);
});

startServer();
