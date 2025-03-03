import express from 'express';
import { body } from 'express-validator';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { validateRequest } from '../middleware/validator.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Validation pour la mise à jour d'utilisateur
const updateUserValidation = [
    body('nom').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Le nom doit contenir entre 2 et 50 caractères'),
    body('prenom').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Le prénom doit contenir entre 2 et 50 caractères'),
    body('email').optional().isEmail().withMessage('Email invalide'),
    body('telephone').optional().matches(/^(\+\d{1,3}[-.]?)?\d{3}[-.]?\d{3}[-.]?\d{4}$/).withMessage('Numéro de téléphone invalide'),
    body('id_role').optional().isInt().withMessage('ID de rôle invalide'),
    body('id_departement').optional().isInt().withMessage('ID de département invalide')
];

// Routes
router.use(authenticate); // Protection de toutes les routes utilisateurs

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUserValidation, validateRequest, updateUser);
router.delete('/:id', deleteUser);

export default router;
