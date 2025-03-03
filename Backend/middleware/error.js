import { validationResult } from 'express-validator';
import { errorResponse } from '../utils/responseFormatter.js';
import logger from '../config/logger.js';

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "Erreur de validation", 
            errors: errors.array() 
        });
    }
    next();
};

export const errorHandler = (err, req, res, next) => {
    logger.error('Erreur:', err);

    // Erreurs Sequelize
    if (err.name === 'SequelizeValidationError') {
        const response = errorResponse(
            'Erreur de validation',
            err.errors.map(e => ({
                field: e.path,
                message: e.message
            })),
            400
        );
        return res.status(response.statusCode).json(response.body);
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        const response = errorResponse(
            'Conflit de données',
            err.errors.map(e => ({
                field: e.path,
                message: e.message
            })),
            409
        );
        return res.status(response.statusCode).json(response.body);
    }

    // Erreurs JWT
    if (err.name === 'JsonWebTokenError') {
        const response = errorResponse('Token invalide', null, 401);
        return res.status(response.statusCode).json(response.body);
    }

    if (err.name === 'TokenExpiredError') {
        const response = errorResponse('Token expiré', null, 401);
        return res.status(response.statusCode).json(response.body);
    }

    // Erreur par défaut
    const response = errorResponse(
        'Erreur interne du serveur',
        process.env.NODE_ENV === 'development' ? err.message : null,
        500
    );
    return res.status(response.statusCode).json(response.body);
};
