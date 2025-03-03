import { body, param } from "express-validator";

const maintenanceRules = [
    // Validation de l'ID de l'équipement
    body('equipementId')
        .notEmpty().withMessage("L'ID de l'équipement est requis")
        .isInt({ min: 1 }).withMessage("L'ID de l'équipement doit être un entier positif"),

    // Validation de la date de maintenance
    body('date_maintenance')
        .notEmpty().withMessage("La date de maintenance est requise")
        .isISO8601().withMessage("La date de maintenance doit être au format YYYY-MM-DD"),

    // Validation du type de maintenance
    body('type_maintenance')
        .notEmpty().withMessage("Le type de maintenance est requis")
        .isIn(['Préventive', 'Corrective', 'Installation', 'Mise à jour'])
        .withMessage("Type de maintenance non valide"),

    // Validation de la description
    body('description')
        .notEmpty().withMessage("La description est requise")
        .isLength({ min: 10, max: 1000 }).withMessage("La description doit contenir entre 10 et 1000 caractères"),

    // Validation du coût
    body('cout')
        .optional()
        .isFloat({ min: 0 }).withMessage("Le coût doit être un nombre positif"),

    // Validation du technicien responsable
    body('technicien')
        .notEmpty().withMessage("Le nom du technicien est requis")
        .isLength({ min: 2, max: 100 }).withMessage("Le nom du technicien doit contenir entre 2 et 100 caractères"),

    // Validation du statut de la maintenance
    body('statut')
        .notEmpty().withMessage("Le statut est requis")
        .isIn(['Planifiée', 'En cours', 'Terminée', 'Annulée'])
        .withMessage("Statut non valide"),

    // Validation des recommandations
    body('recommandations')
        .optional()
        .isLength({ max: 500 }).withMessage("Les recommandations ne peuvent pas dépasser 500 caractères"),

    // Validation de l'ID en paramètre
    param('id')
        .optional()
        .isInt({ min: 1 }).withMessage("L'ID doit être un entier positif")
];

export default maintenanceRules;
