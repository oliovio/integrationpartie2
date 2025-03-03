import { body } from "express-validator";

// Regex pour la validation du nom et prénom (lettres, espaces et tirets autorisés)
const nameRegex = /^[a-zA-ZÀ-ÿ\s-]{2,50}$/;

// Validation pour l'inscription
export const registerRules = [
    // Validation du nom
    body('nom')
        .notEmpty().withMessage("Le nom est requis")
        .matches(nameRegex).withMessage("Le nom n'est pas conforme (2 à 50 caractères, lettres, espaces et tirets uniquement)"),

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

    // Validation de la confirmation du mot de passe
    body('confirmer_mot_de_passe')
        .notEmpty().withMessage("La confirmation du mot de passe est requise")
        .custom((value, { req }) => {
            if (value !== req.body.mot_de_passe) {
                throw new Error("Les mots de passe ne correspondent pas");
            }
            return true;
        }),

    // Validation du rôle
    body('role')
        .optional()
        .isIn(['admin', 'user', 'technicien', 'gestionnaire'])
        .withMessage("Rôle non valide")
];

// Validation pour la connexion
export const loginRules = [
    // Validation de l'email
    body('email')
        .notEmpty().withMessage("L'email est requis")
        .isEmail().withMessage("L'email doit être valide")
        .normalizeEmail(),

    // Validation du mot de passe
    body('mot_de_passe')
        .notEmpty().withMessage("Le mot de passe est requis")
        .isLength({ min: 8 }).withMessage("Le mot de passe doit contenir au moins 8 caractères")
];

// Validation pour la réinitialisation du mot de passe
export const resetPasswordRules = [
    // Validation de l'email pour la demande de réinitialisation
    body('email')
        .notEmpty().withMessage("L'email est requis")
        .isEmail().withMessage("L'email doit être valide")
        .normalizeEmail(),

    // Validation du nouveau mot de passe
    body('nouveau_mot_de_passe')
        .notEmpty().withMessage("Le nouveau mot de passe est requis")
        .isLength({ min: 8 }).withMessage("Le mot de passe doit contenir au moins 8 caractères")
        .matches(/\d/).withMessage("Le mot de passe doit contenir au moins un chiffre")
        .matches(/[a-z]/).withMessage("Le mot de passe doit contenir au moins une lettre minuscule")
        .matches(/[A-Z]/).withMessage("Le mot de passe doit contenir au moins une lettre majuscule")
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Le mot de passe doit contenir au moins un caractère spécial"),

    // Validation de la confirmation du nouveau mot de passe
    body('confirmer_nouveau_mot_de_passe')
        .notEmpty().withMessage("La confirmation du nouveau mot de passe est requise")
        .custom((value, { req }) => {
            if (value !== req.body.nouveau_mot_de_passe) {
                throw new Error("Les mots de passe ne correspondent pas");
            }
            return true;
        }),

    // Validation du token de réinitialisation
    body('reset_token')
        .notEmpty().withMessage("Le token de réinitialisation est requis")
        .isLength({ min: 32, max: 128 }).withMessage("Token de réinitialisation invalide")
];

// Validation pour le changement de mot de passe
export const changePasswordRules = [
    // Validation de l'ancien mot de passe
    body('ancien_mot_de_passe')
        .notEmpty().withMessage("L'ancien mot de passe est requis")
        .isLength({ min: 8 }).withMessage("Le mot de passe doit contenir au moins 8 caractères"),

    // Validation du nouveau mot de passe
    body('nouveau_mot_de_passe')
        .notEmpty().withMessage("Le nouveau mot de passe est requis")
        .isLength({ min: 8 }).withMessage("Le mot de passe doit contenir au moins 8 caractères")
        .matches(/\d/).withMessage("Le mot de passe doit contenir au moins un chiffre")
        .matches(/[a-z]/).withMessage("Le mot de passe doit contenir au moins une lettre minuscule")
        .matches(/[A-Z]/).withMessage("Le mot de passe doit contenir au moins une lettre majuscule")
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Le mot de passe doit contenir au moins un caractère spécial")
        .custom((value, { req }) => {
            if (value === req.body.ancien_mot_de_passe) {
                throw new Error("Le nouveau mot de passe doit être différent de l'ancien");
            }
            return true;
        }),

    // Validation de la confirmation du nouveau mot de passe
    body('confirmer_nouveau_mot_de_passe')
        .notEmpty().withMessage("La confirmation du nouveau mot de passe est requise")
        .custom((value, { req }) => {
            if (value !== req.body.nouveau_mot_de_passe) {
                throw new Error("Les mots de passe ne correspondent pas");
            }
            return true;
        })
];
