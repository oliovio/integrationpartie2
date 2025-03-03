import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/responseFormatter.js';
import logger from '../config/logger.js';

// Génération du token JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id_utilisateur, email: user.email, role: user.id_role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );
};

// Inscription
export const register = async (req, res, next) => {
    try {
        const { mot_de_passe, ...userData } = req.body;

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        // Création de l'utilisateur
        const user = await User.create({
            ...userData,
            mot_de_passe: hashedPassword
        });

        // Génération du token
        const token = generateToken(user);

        const response = successResponse('Inscription réussie', {
            user: {
                id: user.id_utilisateur,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email
            },
            token
        }, 201);

        logger.info(`Nouvel utilisateur créé: ${user.email}`);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(error);
    }
};

// Connexion
export const login = async (req, res, next) => {
    try {
        const { email, mot_de_passe } = req.body;

        // Recherche de l'utilisateur
        const user = await User.findOne({ where: { email } });
        if (!user) {
            const response = errorResponse('Email ou mot de passe incorrect', null, 401);
            return res.status(response.statusCode).json(response.body);
        }

        // Vérification du mot de passe
        const validPassword = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!validPassword) {
            const response = errorResponse('Email ou mot de passe incorrect', null, 401);
            return res.status(response.statusCode).json(response.body);
        }

        // Vérification si l'utilisateur est actif
        if (!user.actif) {
            const response = errorResponse('Compte désactivé', null, 401);
            return res.status(response.statusCode).json(response.body);
        }

        // Mise à jour de la dernière connexion
        await user.update({ derniere_connexion: new Date() });

        // Génération du token
        const token = generateToken(user);

        const response = successResponse('Connexion réussie', {
            user: {
                id: user.id_utilisateur,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                role: user.id_role
            },
            token
        });

        logger.info(`Connexion réussie: ${user.email}`);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(error);
    }
};

// Déconnexion
export const logout = async (req, res) => {
    const response = successResponse('Déconnexion réussie');
    res.status(response.statusCode).json(response.body);
};

// Rafraîchissement du token
export const refreshToken = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) {
            const response = errorResponse('Token requis', null, 400);
            return res.status(response.statusCode).json(response.body);
        }

        // Vérification du token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user || !user.actif) {
            const response = errorResponse('Utilisateur non trouvé ou inactif', null, 401);
            return res.status(response.statusCode).json(response.body);
        }

        // Génération d'un nouveau token
        const newToken = generateToken(user);

        const response = successResponse('Token rafraîchi avec succès', { token: newToken });
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            const response = errorResponse('Token expiré', null, 401);
            return res.status(response.statusCode).json(response.body);
        }
        next(error);
    }
};