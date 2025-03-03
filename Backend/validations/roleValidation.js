import { body, param } from "express-validator";

const roleRules = [
    // Validation du nom du rôle
    body('nom')
        .notEmpty().withMessage("Le nom du rôle est requis")
        .isLength({ min: 2, max: 50 }).withMessage("Le nom du rôle doit contenir entre 2 et 50 caractères")
        .matches(/^[a-zA-Z\s-]+$/).withMessage("Le nom du rôle ne doit contenir que des lettres, espaces et tirets"),

    // Validation de la description
    body('description')
        .optional()
        .isLength({ min: 10, max: 200 }).withMessage("La description doit contenir entre 10 et 200 caractères"),

    // Validation des permissions (tableau de chaînes)
    body('permissions')
        .optional()
        .isArray().withMessage("Les permissions doivent être un tableau")
        .custom((value) => {
            const validPermissions = [
                'GESTION_UTILISATEURS',
                'GESTION_EQUIPEMENTS',
                'GESTION_MAINTENANCE',
                'LECTURE_SEULE',
                'ADMIN'
            ];
            if (!value.every(perm => validPermissions.includes(perm))) {
                throw new Error('Permissions invalides');
            }
            return true;
        }),

    // Validation de l'ID en paramètre
    param('id')
        .optional()
        .isInt({ min: 1 }).withMessage("L'ID doit être un entier positif")
];

export default roleRules;
