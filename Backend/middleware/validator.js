import { validationResult } from 'express-validator';
import { errorResponse } from '../utils/responseFormatter.js';

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = errorResponse(
            'Erreur de validation',
            errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        );
        return res.status(response.statusCode).json(response.body);
    }
    next();
};
