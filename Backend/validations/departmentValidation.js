import { body, param } from "express-validator";

const departmentRules = [
    // Validation pour le champ 'nom' : Il ne peut pas être vide
    body('nom')
        .notEmpty().withMessage("Le nom ne peut pas être vide"),

    // Validation pour le champ 'description' : optionnel, mais si présent, il doit contenir au moins 20 caractères
    body('description')
        .optional()
        .isLength({ min: 20 }).withMessage("La description doit contenir au moins 20 caractères"),

    // Validation pour le paramètre 'id' : optionnel, mais s'il est présent, il doit être un entier positif
    param('id')
        .optional()
        .isInt({ min: 1 }).withMessage("L'id doit être un entier positif")
];

export default departmentRules;
