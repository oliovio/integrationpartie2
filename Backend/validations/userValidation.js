import { body, param } from "express-validator";

// Regex pour la validation du nom et prénom (lettres, espaces et tirets autorisés)
const nameRegex = /^[a-zA-ZÀ-ÿ\s-]{2,50}$/;

// Regex pour la validation du téléphone
const phoneRegex = /^(\+\d{1,3}[-.]?)?\d{3}[-.]?\d{3}[-.]?\d{4}$/;

// Règles de validation pour les utilisateurs
const userRules = [
    // Validation du nom
    body('nom')
        .notEmpty().withMessage("Le nom est requis")
        .matches(nameRegex).withMessage("Le nom n'est pas conforme (2 à 50 caractères, lettres, espaces et tirets uniquement)"),
    
    // Validation du prénom
    body('prenom')
        .notEmpty().withMessage("Le prénom est requis")
        .matches(nameRegex).withMessage("Le prénom n'est pas conforme (2 à 50 caractères, lettres, espaces et tirets uniquement)"),

    // Validation de l'email
    body('email')
        .notEmpty().withMessage("L'email est requis")
        .isEmail().withMessage("L'email doit être valide")
        .normalizeEmail(),

    // Validation du mot de passe
    body('mot_de_passe')
        .notEmpty().withMessage("Le mot de passe est requis")
        .isLength({ min: 8 }).withMessage("Le mot de passe doit contenir au moins 8 caractères")
        .matches(/\d/).withMessage("Le mot de passe doit contenir au moins un chiffre")
        .matches(/[a-z]/).withMessage("Le mot de passe doit contenir au moins une lettre minuscule")
        .matches(/[A-Z]/).withMessage("Le mot de passe doit contenir au moins une lettre majuscule")
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Le mot de passe doit contenir au moins un caractère spécial"),

    // Validation du téléphone
    body('telephone')
        .notEmpty().withMessage("Le numéro de téléphone est requis")
        .matches(phoneRegex).withMessage("Le format du numéro de téléphone n'est pas valide"),

    // Validation de la date d'embauche
    body('date_embauche')
        .notEmpty().withMessage("La date d'embauche est requise")
        .isISO8601().withMessage("La date d'embauche doit être au format YYYY-MM-DD"),

    // Validation de l'ID du rôle
    body('roleId')
        .notEmpty().withMessage("L'ID du rôle est requis")
        .isInt({ min: 1 }).withMessage("L'ID du rôle doit être un entier positif"),

    // Validation de l'ID du département
    body('departmentId')
        .notEmpty().withMessage("L'ID du département est requis")
        .isInt({ min: 1 }).withMessage("L'ID du département doit être un entier positif"),

    // Validation de l'ID en paramètre
    param('id')
        .optional()
        .isInt({ min: 1 }).withMessage("L'ID doit être un entier positif")
];

export default userRules;
