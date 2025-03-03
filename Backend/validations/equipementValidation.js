import { body, param } from "express-validator";

const equipementRules = [
    // Validation du nom de l'équipement
    body('nom')
        .notEmpty().withMessage("Le nom de l'équipement est requis")
        .isLength({ min: 2, max: 100 }).withMessage("Le nom doit contenir entre 2 et 100 caractères"),

    // Validation du type d'équipement
    body('type')
        .notEmpty().withMessage("Le type d'équipement est requis")
        .isIn(['Ordinateur', 'Imprimante', 'Scanner', 'Serveur', 'Réseau', 'Autre'])
        .withMessage("Type d'équipement non valide"),

    // Validation du statut
    body('statut')
        .notEmpty().withMessage("Le statut est requis")
        .isIn(['Disponible', 'En maintenance', 'Hors service', 'En utilisation'])
        .withMessage("Statut non valide"),

    // Validation de la marque
    body('marque')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage("La marque doit contenir entre 2 et 50 caractères"),

    // Validation du modèle
    body('modele')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage("Le modèle doit contenir entre 2 et 50 caractères"),

    // Validation du numéro de série
    body('numero_serie')
        .optional()
        .isLength({ min: 5, max: 50 }).withMessage("Le numéro de série doit contenir entre 5 et 50 caractères"),

    // Validation de la date d'acquisition
    body('date_acquisition')
        .optional()
        .isISO8601().withMessage("La date d'acquisition doit être au format YYYY-MM-DD"),

    // Validation de la date de fin de garantie
    body('date_fin_garantie')
        .optional()
        .isISO8601().withMessage("La date de fin de garantie doit être au format YYYY-MM-DD"),

    // Validation de l'ID du département
    body('departmentId')
        .notEmpty().withMessage("L'ID du département est requis")
        .isInt({ min: 1 }).withMessage("L'ID du département doit être un entier positif"),

    // Validation des notes
    body('notes')
        .optional()
        .isLength({ max: 1000 }).withMessage("Les notes ne peuvent pas dépasser 1000 caractères"),

    // Validation de l'ID en paramètre
    param('id')
        .optional()
        .isInt({ min: 1 }).withMessage("L'ID doit être un entier positif")
];

export default equipementRules;
