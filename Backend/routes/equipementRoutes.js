import express from 'express';
import { body } from 'express-validator';
import { getEquipements, getEquipementById, createEquipement, updateEquipement, deleteEquipement } from '../controllers/equipementController.js';
import { validateRequest } from '../middleware/validator.js';
import { authenticate } from '../middleware/auth.js';
import { EQUIPMENT_TYPES, EQUIPMENT_STATUS } from '../config/constants.js';

const router = express.Router();

// Validation pour la création/mise à jour d'équipement
const equipementValidation = [
    body('nom').trim().isLength({ min: 2, max: 100 }).withMessage('Le nom doit contenir entre 2 et 100 caractères'),
    body('type').isIn(Object.values(EQUIPMENT_TYPES)).withMessage('Type d\'équipement invalide'),
    body('marque').optional().isLength({ max: 50 }).withMessage('La marque ne peut pas dépasser 50 caractères'),
    body('modele').optional().isLength({ max: 50 }).withMessage('Le modèle ne peut pas dépasser 50 caractères'),
    body('numero_serie').optional().isLength({ max: 50 }).withMessage('Le numéro de série ne peut pas dépasser 50 caractères'),
    body('date_acquisition').isISO8601().withMessage('Date d\'acquisition invalide'),
    body('date_fin_garantie').optional().isISO8601().withMessage('Date de fin de garantie invalide'),
    body('statut').isIn(Object.values(EQUIPMENT_STATUS)).withMessage('Statut invalide'),
    body('id_departement').isInt().withMessage('ID de département invalide'),
    body('cout_acquisition').optional().isFloat({ min: 0 }).withMessage('Coût d\'acquisition invalide')
];

// Routes
router.use(authenticate); // Protection de toutes les routes équipements

router.get('/equipements', getEquipements);
router.get('/equipements/:id', getEquipementById);
router.post('/equipements', equipementValidation, validateRequest, createEquipement);
router.put('/equipements/:id', equipementValidation, validateRequest, updateEquipement);
router.delete('/equipements/:id', deleteEquipement);

export default router;
