import express from 'express';
import { body } from 'express-validator';
import { getMaintenances, getMaintenanceById, createMaintenance, updateMaintenance, deleteMaintenance } from '../controllers/maintenanceController.js';
import { validateRequest } from '../middleware/validator.js';
import { authenticate } from '../middleware/auth.js';
import { MAINTENANCE_TYPES, MAINTENANCE_STATUS } from '../config/constants.js';

const router = express.Router();

// Validation pour la création/mise à jour de maintenance
const maintenanceValidation = [
    body('id_equipement').isInt().withMessage('ID d\'équipement invalide'),
    body('date_maintenance').isISO8601().withMessage('Date de maintenance invalide'),
    body('type_maintenance').isIn(Object.values(MAINTENANCE_TYPES)).withMessage('Type de maintenance invalide'),
    body('description').isLength({ min: 10, max: 1000 }).withMessage('La description doit contenir entre 10 et 1000 caractères'),
    body('cout').optional().isFloat({ min: 0 }).withMessage('Coût invalide'),
    body('technicien').isLength({ min: 2, max: 100 }).withMessage('Nom du technicien invalide'),
    body('statut').isIn(Object.values(MAINTENANCE_STATUS)).withMessage('Statut invalide'),
    body('recommandations').optional().isLength({ max: 500 }).withMessage('Les recommandations ne peuvent pas dépasser 500 caractères'),
    body('date_fin').optional().isISO8601().withMessage('Date de fin invalide'),
    body('pieces_changees').optional().isLength({ max: 500 }).withMessage('La liste des pièces ne peut pas dépasser 500 caractères'),
    body('duree_intervention').optional().isInt({ min: 0, max: 10080 }).withMessage('Durée d\'intervention invalide')
];

// Routes
router.use(authenticate); // Protection de toutes les routes maintenance

router.get('/', getMaintenances);
router.get('/:id', getMaintenanceById);
router.post('/', maintenanceValidation, validateRequest, createMaintenance);
router.put('/:id', maintenanceValidation, validateRequest, updateMaintenance);
router.delete('/:id', deleteMaintenance);

export default router;
