import express from 'express';
import { body } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { validateRequest } from '../middleware/validator.js';

const router = express.Router();

// Validation pour l'inscription
const registerValidation = [
    body('nom').trim().isLength({ min: 2, max: 50 }).withMessage('Le nom doit contenir entre 2 et 50 caractères'),
    body('prenom').trim().isLength({ min: 2, max: 50 }).withMessage('Le prénom doit contenir entre 2 et 50 caractères'),
    body('email').isEmail().withMessage('Email invalide'),
    body('mot_de_passe').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    body('telephone').matches(/^(\+\d{1,3}[-.]?)?\d{3}[-.]?\d{3}[-.]?\d{4}$/).withMessage('Numéro de téléphone invalide'),
    body('id_role').isInt().withMessage('ID de rôle invalide'),
    body('id_departement').isInt().withMessage('ID de département invalide')
];

// Validation pour la connexion
const loginValidation = [
    body('email').isEmail().withMessage('Email invalide'),
    body('mot_de_passe').notEmpty().withMessage('Mot de passe requis')
];

// Routes
router.post('/register', registerValidation, validateRequest, async (req, res) => {
    // Cette route n'est pas définie dans la mise à jour, elle est donc laissée vide
    // Vous pouvez ajouter la logique de register ici
});

router.post('/login', loginValidation, validateRequest, async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;

        // Recherche de l'utilisateur
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email ou mot de passe incorrect"
            });
        }

        // Vérification du mot de passe
        const validPassword = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Email ou mot de passe incorrect"
            });
        }

        // Génération du token JWT
        const token = jwt.sign(
            { 
                id: user.id,
                email: user.email,
                role: user.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Renvoyer le token
        res.json({
            success: true,
            message: "Connexion réussie",
            token: token,
            user: {
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({
            success: false,
            message: "Erreur lors de la connexion"
        });
    }
});

router.post('/logout', async (req, res) => {
    // Cette route n'est pas définie dans la mise à jour, elle est donc laissée vide
    // Vous pouvez ajouter la logique de logout ici
});

router.post('/refresh-token', async (req, res) => {
    // Cette route n'est pas définie dans la mise à jour, elle est donc laissée vide
    // Vous pouvez ajouter la logique de refreshToken ici
});

export default router;
