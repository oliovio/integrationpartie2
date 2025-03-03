import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/responseFormatter.js';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            const response = errorResponse('Token d\'authentification manquant', null, 401);
            return res.status(response.statusCode).json(response.body);
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id);
        if (!user || !user.actif) {
            const response = errorResponse('Utilisateur non trouvé ou inactif', null, 401);
            return res.status(response.statusCode).json(response.body);
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            const response = errorResponse('Token expiré', null, 401);
            return res.status(response.statusCode).json(response.body);
        }
        const response = errorResponse('Token invalide', null, 401);
        return res.status(response.statusCode).json(response.body);
    }
};

export const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Non authentifié" });
        }

        const userRole = req.user.Role?.nom || req.user.role;
        
        if (!roles.includes(userRole)) {
            return res.status(403).json({ 
                message: "Accès non autorisé pour ce rôle" 
            });
        }

        next();
    };
};
