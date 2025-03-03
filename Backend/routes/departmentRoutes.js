import express from 'express';
import { body } from 'express-validator';
import { getDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment } from '../controllers/departmentController.js';
import { validateRequest } from '../middleware/validator.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Validation pour la création/mise à jour de département
const departmentValidation = [
    body('nom').trim().isLength({ min: 2, max: 100 }).withMessage('Le nom doit contenir entre 2 et 100 caractères'),
    body('description').optional().isLength({ max: 1000 }).withMessage('La description ne peut pas dépasser 1000 caractères'),
    body('responsable_id').optional().isInt().withMessage('ID de responsable invalide'),
    body('localisation').optional().isLength({ max: 100 }).withMessage('La localisation ne peut pas dépasser 100 caractères'),
    body('budget_annuel').optional().isFloat({ min: 0 }).withMessage('Budget annuel invalide')
];

// Routes
router.use(authenticate); // Protection de toutes les routes départements

router.get('/', getDepartments);
router.get('/:id', getDepartmentById);
router.post('/', departmentValidation, validateRequest, createDepartment);
router.put('/:id', departmentValidation, validateRequest, updateDepartment);
router.delete('/:id', deleteDepartment);

export default router;
